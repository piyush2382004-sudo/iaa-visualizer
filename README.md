# DSA Visualizer


A Next.js web app that animates sorting algorithms, grid pathfinding and core data structures.
All data structures and algorithms are implemented from scratch in `lib/`; the UI only draws their output.

## Run
```bash
npm install
npm run dev     # open http://localhost:3000
```

## Features
| Tab | What it shows | DSA concepts |
|---|---|---|
| Sorting | Bubble, Selection, Insertion, Merge, Quick sort animated as bars | Arrays, recursion, divide and conquer |
| Pathfinding | BFS, DFS, Dijkstra on a 15x30 grid with user-drawn walls | Queue, Stack, Min-Heap, graphs |
| Data structures | Stack, Queue, Binary Search Tree with traversals | Linked behaviour, trees, recursion |

## Structure
- `lib/structures.js` Stack, Queue, MinHeap, BST
- `lib/sorting.js` five sorts as generators (each `yield` is one animation frame)
- `lib/pathfinding.js` one search loop; swapping the frontier (Queue / Stack / MinHeap) gives BFS / DFS / Dijkstra
- `components/` the three tabs; `app/` Next.js app router

## Complexity
| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble | O(n) | O(n²) | O(n²) | O(1) |
| Selection | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion | O(n) | O(n²) | O(n²) | O(1) |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick | O(n log n) | O(n log n) | O(n²) | O(log n) |
| BFS / DFS | O(V+E) | O(V+E) | O(V+E) | O(V) |
| Dijkstra (heap) | O((V+E) log V) | | | O(V) |
| BST insert/search | O(log n) | O(log n) | O(n) | O(n) |

## Viva notes
- Why a generator for sorting? It lets the UI pause between steps without changing the algorithm's logic.
- BFS vs DFS: BFS uses a queue and finds shortest paths on unweighted graphs; DFS uses a stack and does not.
- Why a heap in Dijkstra? It gives the closest unvisited node in O(log n) instead of O(n).
- When does a BST degrade? Inserting sorted data makes it a linked list, so height becomes n.

## Possible extensions
Add AVL balancing, weighted cells for Dijkstra, linked list and graph demos, or a step counter comparison chart.
