import { MinHeap, Queue, Stack } from "./structures";

export const ROWS = 15, COLS = 30;
export const cellKey = (r, c) => r * COLS + c;

const neighbors = (r, c) =>
  [[r - 1, c], [r, c + 1], [r + 1, c], [r, c - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < ROWS && b < COLS);

// One search loop, three frontiers: Queue = BFS, Stack = DFS, MinHeap = Dijkstra.
export function search(algo, start, end, walls) {
  const frontier = algo === "bfs" ? new Queue() : algo === "dfs" ? new Stack() : new MinHeap((a, b) => a.d - b.d);
  const closed = new Set(), prev = new Map(), dist = new Map(), visited = [];
  const sk = cellKey(...start), ek = cellKey(...end);
  dist.set(sk, 0); frontier.push({ cell: start, d: 0 });
  let found = false;

  while (!frontier.isEmpty()) {
    const { cell, d } = frontier.pop();
    const k = cellKey(...cell);
    if (closed.has(k)) continue;
    closed.add(k); visited.push(k);
    if (k === ek) { found = true; break; }
    for (const [nr, nc] of neighbors(...cell)) {
      const nk = cellKey(nr, nc);
      if (walls.has(nk) || closed.has(nk)) continue;
      if (algo === "dijkstra") {
        if (d + 1 < (dist.get(nk) ?? Infinity)) { dist.set(nk, d + 1); prev.set(nk, k); frontier.push({ cell: [nr, nc], d: d + 1 }); }
      } else if (!prev.has(nk)) { prev.set(nk, k); frontier.push({ cell: [nr, nc], d: d + 1 }); }
    }
  }
  const path = [];
  if (found) for (let k = ek; k !== undefined; k = prev.get(k)) path.unshift(k);
  return { visited, path };
}

export const PATHS = {
  bfs:      { name: "Breadth-First Search", note: "Queue. Always finds the shortest path (unweighted grid)." },
  dfs:      { name: "Depth-First Search",   note: "Stack. Finds a path, usually not the shortest." },
  dijkstra: { name: "Dijkstra",             note: "Min-heap. Shortest path; handles weighted edges." },
};
