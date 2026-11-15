import json
import math
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


repo_folder = Path(__file__).resolve().parent.parent

grid_file = repo_folder / "backend" / "data" / "jezero-grid.json"

with open(grid_file, "r") as file:
    grid = json.load(file)

elevations = grid["elevations"]

# Read JSON into a Python dictionary
with open(repo_folder / "route.json", "r") as file:
    coords = json.load(file)

start = coords["start"]
finish = coords["finish"]
finalPath = coords["path"]

# implement A star here now

paths = [((start,0))]

def a_star(start, finish, elevations):
    start = tuple(start)
    finish = tuple(finish)

    rows = len(elevations)
    columns = len(elevations[0])

    cell_width = 355.73
    cell_height = 355.24

    gravity = 3.7
    rolling_coefficient = 0.1

    def heuristic(cell):
        row, column = cell
        finish_row, finish_column = finish

        horizontal_distance = math.hypot(
            (finish_column - column) * cell_width,
            (finish_row - row) * cell_height,
        )

        height_difference = (
            elevations[finish_row][finish_column]
            - elevations[row][column]
        )

        rolling_estimate = rolling_coefficient * gravity * horizontal_distance
        climbing_estimate = gravity * max(height_difference, 0) # rule out negative values bc rover cant gain battery

        return rolling_estimate + climbing_estimate

    def path_score(path):
        last_cell = path[-1][0]
        cost_so_far = path[-1][1]

        return cost_so_far + heuristic(last_cell)

    
    # Each path contains (cell, total cost so far) pairs.
    waiting_list = [[(start, 0)]]
    best_cost = {start: 0}

    while waiting_list:
        # Choose the path whose last cell has the lowest A* score.
        current_path = min(waiting_list, key=path_score)
        waiting_list.remove(current_path)

        current_cell, current_cost = current_path[-1]

        # A cheaper path to this cell may have been found since
        # this path was added to the waiting list.
        if current_cost > best_cost[current_cell]:
            continue

        if current_cell == finish:
            return current_path

        row, column = current_cell

        neighbors = [
            (row - 1, column, cell_height),  # above
            (row + 1, column, cell_height),  # below
            (row, column - 1, cell_width),   # left
            (row, column + 1, cell_width),   # right
        ]

        for next_row, next_column, distance in neighbors:
            if not (0 <= next_row < rows and 0 <= next_column < columns):
                continue

            next_height = elevations[next_row][next_column]
            if next_height is None:
                continue

            current_height = elevations[row][column]
            height_change = next_height - current_height

            angle = math.degrees(math.atan2(height_change, distance))

            if not (-32 < angle < 32):
                continue

            rolling_energy = rolling_coefficient * gravity * distance
            climbing_energy = gravity * max(height_change, 0)
            new_cost = current_cost + rolling_energy + climbing_energy

            next_cell = (next_row, next_column)

            if new_cost < best_cost.get(next_cell, math.inf):
                best_cost[next_cell] = new_cost

                new_path = current_path + [(next_cell, new_cost)]
                waiting_list.append(new_path)

    return None  


@app.post("/route")
def find_route(request: dict):
    start = request["start"]
    finish = request["finish"]

    path = a_star(start, finish, elevations)
    path_cells = [cell for cell, cost in path]

    route_data = {
        "start": start,
        "finish": finish,
        "path": path_cells,
    }

    with open(repo_folder / "route.json", "w") as file:
        json.dump(route_data, file)

    return route_data