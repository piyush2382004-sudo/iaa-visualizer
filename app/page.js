"use client";
import { useState } from "react";
import SortingVisualizer from "../components/SortingVisualizer";
import PathfindingVisualizer from "../components/PathfindingVisualizer";
import StructuresDemo from "../components/StructuresDemo";

const TABS = [
  ["sort", "Sorting", SortingVisualizer],
  ["path", "Pathfinding", PathfindingVisualizer],
  ["ds", "Data structures", StructuresDemo],
];

export default function Home() {
  const [tab, setTab] = useState("sort");
  const Active = TABS.find((t) => t[0] === tab)[2];
  return (
    <main>
      <h1>DSA Visualizer</h1>
      <p className="lead">Watch sorting, graph search and core data structures work one step at a time.</p>
      <nav role="tablist">
        {TABS.map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "tab on" : "tab"} onClick={() => setTab(k)}>{label}</button>
        ))}
      </nav>
      <Active />
    </main>
  );
}
