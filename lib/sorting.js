// Each algorithm is a generator: every `yield` is one animation frame.
const snap = (a, active = []) => ({ array: [...a], active });
const all = (a) => ({ array: [...a], active: [], done: true });

function* bubble(input) {
  const a = [...input];
  for (let i = 0; i < a.length - 1; i++)
    for (let j = 0; j < a.length - i - 1; j++) {
      yield snap(a, [j, j + 1]);
      if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; yield snap(a, [j, j + 1]); }
    }
  yield all(a);
}

function* selection(input) {
  const a = [...input];
  for (let i = 0; i < a.length - 1; i++) {
    let m = i;
    for (let j = i + 1; j < a.length; j++) { yield snap(a, [m, j]); if (a[j] < a[m]) m = j; }
    [a[i], a[m]] = [a[m], a[i]]; yield snap(a, [i, m]);
  }
  yield all(a);
}

function* insertion(input) {
  const a = [...input];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      [a[j - 1], a[j]] = [a[j], a[j - 1]]; yield snap(a, [j - 1, j]); j--;
    }
  }
  yield all(a);
}

function* merge(input) {
  const a = [...input];
  function* sort(l, r) {
    if (l >= r) return;
    const m = (l + r) >> 1;
    yield* sort(l, m); yield* sort(m + 1, r);
    const L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < L.length && j < R.length) { a[k] = L[i] <= R[j] ? L[i++] : R[j++]; yield snap(a, [k++]); }
    while (i < L.length) { a[k] = L[i++]; yield snap(a, [k++]); }
    while (j < R.length) { a[k] = R[j++]; yield snap(a, [k++]); }
  }
  yield* sort(0, a.length - 1);
  yield all(a);
}

function* quick(input) {
  const a = [...input];
  function* qs(l, r) {
    if (l >= r) return;
    const p = a[r]; let i = l;
    for (let j = l; j < r; j++) {
      yield snap(a, [j, r]);
      if (a[j] < p) { [a[i], a[j]] = [a[j], a[i]]; yield snap(a, [i, j]); i++; }
    }
    [a[i], a[r]] = [a[r], a[i]]; yield snap(a, [i, r]);
    yield* qs(l, i - 1); yield* qs(i + 1, r);
  }
  yield* qs(0, a.length - 1);
  yield all(a);
}

export const SORTS = {
  bubble:    { name: "Bubble Sort",    run: bubble,    best: "O(n)",       avg: "O(n²)",      worst: "O(n²)",      space: "O(1)" },
  selection: { name: "Selection Sort", run: selection, best: "O(n²)",      avg: "O(n²)",      worst: "O(n²)",      space: "O(1)" },
  insertion: { name: "Insertion Sort", run: insertion, best: "O(n)",       avg: "O(n²)",      worst: "O(n²)",      space: "O(1)" },
  merge:     { name: "Merge Sort",     run: merge,     best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  quick:     { name: "Quick Sort",     run: quick,     best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)",      space: "O(log n)" },
};
