// Core data structures, written from scratch (no built-in library shortcuts).

export class Stack { // LIFO
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  toArray() { return [...this.items]; }
}

export class Queue { // FIFO, head pointer gives O(1) dequeue
  constructor() { this.items = []; this.head = 0; }
  enqueue(x) { this.items.push(x); }
  dequeue() {
    if (this.isEmpty()) return undefined;
    const v = this.items[this.head++];
    if (this.head > 32 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head); this.head = 0;
    }
    return v;
  }
  isEmpty() { return this.head >= this.items.length; }
  toArray() { return this.items.slice(this.head); }
}
Queue.prototype.push = Queue.prototype.enqueue;
Queue.prototype.pop = Queue.prototype.dequeue;

export class MinHeap { // binary heap used by Dijkstra
  constructor(cmp = (a, b) => a - b) { this.h = []; this.cmp = cmp; }
  isEmpty() { return this.h.length === 0; }
  push(x) {
    const h = this.h; h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(h[i], h[p]) >= 0) break;
      [h[i], h[p]] = [h[p], h[i]]; i = p;
    }
  }
  pop() {
    const h = this.h;
    if (!h.length) return undefined;
    const top = h[0], last = h.pop();
    if (h.length) {
      h[0] = last; let i = 0;
      for (;;) {
        let s = i; const l = 2 * i + 1, r = l + 1;
        if (l < h.length && this.cmp(h[l], h[s]) < 0) s = l;
        if (r < h.length && this.cmp(h[r], h[s]) < 0) s = r;
        if (s === i) break;
        [h[i], h[s]] = [h[s], h[i]]; i = s;
      }
    }
    return top;
  }
}

class Node { constructor(v) { this.v = v; this.l = null; this.r = null; } }

export class BST { // binary search tree (duplicates ignored)
  constructor() { this.root = null; }
  insert(v) {
    const n = new Node(v);
    if (!this.root) { this.root = n; return true; }
    let c = this.root;
    for (;;) {
      if (v === c.v) return false;
      const side = v < c.v ? "l" : "r";
      if (!c[side]) { c[side] = n; return true; }
      c = c[side];
    }
  }
  search(v) {
    let c = this.root;
    while (c) { if (v === c.v) return true; c = v < c.v ? c.l : c.r; }
    return false;
  }
  height(n = this.root) { return n ? 1 + Math.max(this.height(n.l), this.height(n.r)) : 0; }
  inorder(n = this.root, o = []) { if (n) { this.inorder(n.l, o); o.push(n.v); this.inorder(n.r, o); } return o; }
  preorder(n = this.root, o = []) { if (n) { o.push(n.v); this.preorder(n.l, o); this.preorder(n.r, o); } return o; }
  postorder(n = this.root, o = []) { if (n) { this.postorder(n.l, o); this.postorder(n.r, o); o.push(n.v); } return o; }
}
