"use client";
import { useRef, useState } from "react";
import { COLS, ROWS, PATHS, cellKey, search } from "../lib/pathfinding";

const START = [7, 3], END = [7, 26];

export default function PathfindingVisualizer() {
  const [algo, setAlgo] = useState("bfs");
  const [walls, setWalls] = useState(new Set());
  const [seen, setSeen] = useState(0);
  const [result, setResult] = useState(null);
  const [showPath, setShowPath] = useState(false);
  const [busy, setBusy] = useState(false);
  const timer = useRef(null);
  const drawing = useRef(false);

  const clearRun = () => { clearInterval(timer.current); setSeen(0); setResult(null); setShowPath(false); setBusy(false); };
  const toggle = (k) => {
    if (busy || k === cellKey(...START) || k === cellKey(...END)) return;
    clearRun();
    setWalls((w) => { const n = new Set(w); n.has(k) ? n.delete(k) : n.add(k); return n; });
  };

  function go() {
    clearRun();
    const res = search(algo, START, END, walls);
    setResult(res); setBusy(true);
    let i = 0;
    timer.current = setInterval(() => {
      i += 2; setSeen(i);
      if (i >= res.visited.length) { clearInterval(timer.current); setShowPath(true); setBusy(false); }
    }, 15);
  }

  const visited = result ? new Set(result.visited.slice(0, seen)) : new Set();
  const path = showPath && result ? new Set(result.path) : new Set();
  const cells = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const k = cellKey(r, c);
      const cls = k === cellKey(...START) ? "start" : k === cellKey(...END) ? "end"
        : walls.has(k) ? "wall" : path.has(k) ? "path" : visited.has(k) ? "visited" : "";
      cells.push(
        <div key={k} className={`cell ${cls}`}
          onMouseDown={() => { drawing.current = true; toggle(k); }}
          onMouseEnter={() => drawing.current && toggle(k)} />
      );
    }

  return (
    <section onMouseUp={() => (drawing.current = false)} onMouseLeave={() => (drawing.current = false)}>
      <div className="controls">
        <label>Algorithm
          <select value={algo} disabled={busy} onChange={(e) => { clearRun(); setAlgo(e.target.value); }}>
            {Object.entries(PATHS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </label>
        <button onClick={go} disabled={busy}>Find path</button>
        <button className="ghost" disabled={busy} onClick={() => { clearRun(); setWalls(new Set()); }}>Clear walls</button>
      </div>
      <p className="meta">{PATHS[algo].note} Click or drag on the grid to draw walls.</p>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>{cells}</div>
      {showPath && result && (
        <p className="meta">
          {result.path.length ? `Path length: ${result.path.length - 1} steps. ` : "No path exists. "}
          Cells explored: {result.visited.length}.
        </p>
      )}
    </section>
  );
}
