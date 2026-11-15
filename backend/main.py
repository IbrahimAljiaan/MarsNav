import json
from pathlib import Path
from fastapi import FastAPI

app = FastAPI()


repo_folder = Path(__file__).resolve().parent.parent

# Read JSON into a Python dictionary
with open(repo_folder / "route.json", "r") as file:
    points = json.load(file)

# implement A star here now

# Write a Python dictionary as JSON
path_data = {"path": [[5, 10], [5, 11], [5, 12]]}

@app.get("/")

async def root():
    return {"message": "Hello World"}