"use client";
import { useEffect, useRef, useState } from "react";
import { SORTS } from "../lib/sorting";

const makeArray = (n) => Array.from({ length: n }, () => 10 + Math.floor(Math.random() * 90));

export default function SortingVisualizer() {
  const [algo, setAlgo] = useState("bubble");
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(40);
  const [frame, setFrame] = useState({ array: [], active: [] });
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const run = useRef(0);

  const reset = (n = size) => { run.current++; setRunning(false); setSteps(0); setFrame({ array: makeArray(n), active: [] }); };
  useEffect(() => { reset(size); return () => { run.current++; }; }, [size]);

  async function start() {
    const id = ++run.current;
    setRunning(true); setSteps(0);
    let n = 0;
    for (const f of SORTS[algo].run(frame.array)) {
      if (run.current !== id) return;
      setFrame(f); setSteps(++n);
      await new Promise((r) => setTimeout(r, speed));
    }
    if (run.current === id) setRunning(false);
  }

  const s = SORTS[algo];
  return (
    <section>
      <div className="controls">
        <label>Algorithm
          <select value={algo} disabled={running} onChange={(e) => setAlgo(e.target.value)}>
            {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </label>
        <label>Size ({size})
          <input type="range" min="10" max="80" value={size} disabled={running} onChange={(e) => setSize(+e.target.value)} />
        </label>
        <label>Delay ({speed} ms)
          <input type="range" min="1" max="200" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
        </label>
        <button onClick={start} disabled={running || frame.done}>Sort</button>
        <button className="ghost" onClick={() => reset()}>New array</button>
      </div>
      <div className="bars" aria-label="Array bars">
        {frame.array.map((v, i) => (
          <div key={i} className={frame.done ? "bar done" : frame.active.includes(i) ? "bar active" : "bar"} style={{ height: `${v}%` }} />
        ))}
      </div>
      <p className="meta">Frames drawn: {steps}</p>
      <table>
        <thead><tr><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr></thead>
        <tbody><tr><td>{s.best}</td><td>{s.avg}</td><td>{s.worst}</td><td>{s.space}</td></tr></tbody>
      </table>
    </section>
  );
}
