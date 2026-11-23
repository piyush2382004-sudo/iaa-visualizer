"use client";
import { useState } from "react";
import { BST, Queue, Stack } from "../lib/structures";

function Linear({ title, make, add, remove, label }) {
  const [ds] = useState(make);
  const [, tick] = useState(0);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");
  const items = ds.toArray();
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="controls">
        <input value={val} placeholder="value" onChange={(e) => setVal(e.target.value)} />
        <button onClick={() => { if (!val.trim()) return; ds[add](val.trim()); setVal(""); setMsg(""); tick((n) => n + 1); }}>{add}</button>
        <button className="ghost" onClick={() => { const v = ds[remove](); setMsg(v === undefined ? `${title} is empty` : `${remove}: ${v}`); tick((n) => n + 1); }}>{remove}</button>
      </div>
      <div className="row">{items.length ? items.map((x, i) => <span key={i} className="chip">{x}</span>) : <em>empty</em>}</div>
      <p className="meta">{label}{msg && ` · ${msg}`}</p>
    </div>
  );
}

function Tree({ n, x, y, gap, out }) {
  if (!n) return null;
  const kids = [["l", x - gap], ["r", x + gap]];
  return (
    <>
      {kids.map(([s, nx]) => n[s] && <line key={s} x1={x} y1={y} x2={nx} y2={y + 46} stroke="var(--line)" strokeWidth="2" />)}
      {kids.map(([s, nx]) => <Tree key={s} n={n[s]} x={nx} y={y + 46} gap={gap / 2} out={out} />)}
      <circle cx={x} cy={y} r="15" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="12">{n.v}</text>
    </>
  );
}

function BSTDemo() {
  const [t] = useState(() => { const b = new BST(); [50, 30, 70, 20, 40, 60, 80].forEach((v) => b.insert(v)); return b; });
  const [, tick] = useState(0);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("");
  const num = Number(val);
  const ok = val.trim() !== "" && Number.isFinite(num);
  return (
    <div className="panel wide">
      <h3>Binary Search Tree</h3>
      <div className="controls">
        <input value={val} placeholder="number" onChange={(e) => setVal(e.target.value)} />
        <button onClick={() => { if (!ok) return setMsg("Enter a number"); setMsg(t.insert(num) ? `Inserted ${num}` : `${num} already exists`); setVal(""); tick((n) => n + 1); }}>insert</button>
        <button className="ghost" onClick={() => ok ? setMsg(t.search(num) ? `${num} found` : `${num} not found`) : setMsg("Enter a number")}>search</button>
      </div>
      <svg viewBox="0 0 640 260" className="tree"><Tree n={t.root} x={320} y={24} gap={150} /></svg>
      <p className="meta">Height {t.height()}{msg && ` · ${msg}`}</p>
      <p className="meta">Inorder: {t.inorder().join(", ")}</p>
      <p className="meta">Preorder: {t.preorder().join(", ")}</p>
      <p className="meta">Postorder: {t.postorder().join(", ")}</p>
    </div>
  );
}

export default function StructuresDemo() {
  return (
    <section className="demos">
      <Linear title="Stack" make={() => new Stack()} add="push" remove="pop" label="LIFO: last in, first out. All operations O(1)." />
      <Linear title="Queue" make={() => new Queue()} add="enqueue" remove="dequeue" label="FIFO: first in, first out. All operations O(1)." />
      <BSTDemo />
    </section>
  );
}
