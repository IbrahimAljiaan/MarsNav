import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [selectionMode, setSelectionMode] = useState("start");
  const [path, setPath] = useState([]);




function handleMapClick(event) {
  const image = event.currentTarget;
  const bounds = image.getBoundingClientRect();

  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;


  const col = Math.min(249, Math.floor((x/bounds.width)*250));
  const row = Math.min(284, Math.floor((y/bounds.height) *285));

  setPath([]);
  
  if (selectionMode==="start"){
    setStart({row, col});

  } else {

    setGoal({row, col});
  }





}
async function handleFindRoute() {
  try {
    const response = await fetch("http://localhost:8000/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      start: [start.row, start.col],
      finish: [goal.row, goal.col],
}),
    });

    if (!response.ok) {
      throw new Error(`Backend returned HTTP ${response.status}`);
    }

    const result = await response.json();
    setPath(result.path ?? []);
    console.log("Route response:", result);
  } catch (error) {
    console.error("Route request failed:", error);
  }
}
return (
  <main className="marsnav">
    <header className="marsnav-header">
      <h1>MarsNav</h1>
      <p>Jezero Crater</p>
    </header>



    <div className="map-frame">
      <img
        src="/FrontEndMap.png"
        alt="Orbital map of Jezero Crater"
        onClick={handleMapClick}
      />
      <svg
        className="map-overlay"
        viewBox="0 0 250 285"

        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points={path.map(([row, col]) => `${col + 0.5},${row + 0.5}`).join(" ")}
          fill="none"
          stroke="cyan"
          strokeWidth="2"
        />
        {start && (
          <circle cx={start.col + 0.5} cy={start.row + 0.5} r="3" fill="limegreen" />
        )}
        {goal && (
          <circle cx={goal.col + 0.5} cy={goal.row + 0.5} r="3" fill="orange" />
        )}
      </svg>
    </div>

    <section className="route-controls" aria-label="Route controls">
      <p>
        Click the map to set {selectionMode === "start" ? "start" : "destination"}.
      </p>

      <div className="route-buttons">
        <button
          type="button"
          aria-pressed={selectionMode === "start"}
          onClick={() => setSelectionMode("start")}
        >
          Set start
        </button>
        <button
          type="button"
          aria-pressed={selectionMode === "goal"}
          onClick={() => setSelectionMode("goal")}
        >
          Set destination
        </button>
        <button
          type="button"
          className="find-route"
          disabled={!start || !goal}
          onClick={handleFindRoute}
        >
          Find route
        </button>
      </div>

      <div className="route-coordinates">
        <p><strong>Start</strong> {start ? `Row ${start.row}, Col ${start.col}` : "Not set"}</p>
        <p><strong>Destination</strong> {goal ? `Row ${goal.row}, Col ${goal.col}` : "Not set"}</p>
      </div>
    </section>
  </main>
)
}

export default App