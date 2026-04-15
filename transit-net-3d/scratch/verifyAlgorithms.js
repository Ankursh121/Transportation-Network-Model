import { dijkstra, bfs, dfs, getMST, getReachability } from '../src/algorithms/graphAlgorithms.js';

const nodes = [
  { id: 'A', name: 'NYC' },
  { id: 'B', name: 'LDN' },
  { id: 'C', name: 'PAR' },
  { id: 'D', name: 'TOK' }
];

const edges = [
  { id: 'e1', source: 'A', target: 'B', weight: 2 },
  { id: 'e2', source: 'B', target: 'C', weight: 3 },
  { id: 'e3', source: 'A', target: 'C', weight: 6 },
  { id: 'e4', source: 'C', target: 'D', weight: 1 }
];

console.log("--- DIJKSTRA TEST ---");
const dResult = dijkstra(nodes, edges, 'A');
console.log("Distances:", dResult.distances);

const { path, pathEdges } = dResult.getPathTo('D');
console.log("Shortest path to D:", path.join(' -> '));
console.log("Used edges:", pathEdges.join(', '));

console.log("\n--- BFS TEST ---");
const bResult = bfs(nodes, edges, 'A');
console.log("BFS Sequence:", bResult);

console.log("\n--- DFS TEST ---");
const dfResult = dfs(nodes, edges, 'A');
console.log("DFS Sequence:", dfResult);

console.log("\n--- MST TEST ---");
const mstResult = getMST(nodes, edges);
console.log("MST Edges:", mstResult.edges.map(e => `${e.source}-${e.target}`));
console.log("MST Cost:", mstResult.cost);

console.log("\n--- REACHABILITY TEST ---");
const rResult = getReachability(nodes, edges, 'A');
console.log("Reachable from A:", rResult);
