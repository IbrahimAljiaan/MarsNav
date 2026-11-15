import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [selectionMode, setSelectionMode] = useState("start");



function handleMapClick(event) {
  const image = event.currentTarget;
  const bounds = image.getBoundingClientRect();

  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;


  const col = Math.min(249, Math.floor((x/bounds.width)*250));
  const row = Math.min(284, Math.floor((y/bounds.height) *285));

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
    console.log("Route response:", result);
  } catch (error) {
    console.error("Route request failed:", error);
  }
}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>MarsNav</h1>
          <img
            src="/FrontEndMap.png"
            alt="Orbital map of Jezero Crater"
            onClick={handleMapClick}
          />

          <div>
            <button type="button" onClick={() => setSelectionMode("start")}>
              Set start
            </button>
            <button type="button" onClick={() => setSelectionMode("goal")}>
              Set destination
            </button>
          </div>
          <p>Click the map to set the {selectionMode === "start" ? "start" : "destination"}.</p>
          <p>Start: {start ? `Row ${start.row}, Column ${start.col}` : "Not set"}</p>
          <p>Destination: {goal ? `Row ${goal.row}, Column ${goal.col}` : "Not set"}</p>
          <button type="button" onClick={handleFindRoute} disabled={!start || !goal}>
             Find route
          </button>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
