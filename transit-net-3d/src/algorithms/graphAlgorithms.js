/**
 * Dijkstra's Algorithm for Shortest Path
 * Returns distances, previous node tracking, and the specific path to all nodes
 */
export const dijkstra = (nodes, edges, sourceId) => {
  const distances = {};
  const previous = {};
  const queue = [];

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    queue.push(node.id);
  });

  distances[sourceId] = 0;

  while (queue.length > 0) {
    // Basic priority queue behavior via sorting
    queue.sort((a, b) => distances[a] - distances[b]);
    const u = queue.shift();

    if (distances[u] === Infinity) break;

    // Filter edges connected to current node u
    const neighbors = edges.filter(e => e.source === u || e.target === u);
    
    for (const edge of neighbors) {
      const v = edge.source === u ? edge.target : edge.source;
      if (!queue.includes(v)) continue;

      const alt = distances[u] + edge.weight;
      if (alt < distances[v]) {
        distances[v] = alt;
        previous[v] = { node: u, edgeId: edge.id };
      }
    }
  }

  // Helper to reconstruct path to any target
  const getPathTo = (targetId) => {
    const path = [];
    const pathEdges = [];
    let curr = targetId;
    
    while (curr && previous[curr]) {
      path.unshift(curr);
      pathEdges.unshift(previous[curr].edgeId);
      curr = previous[curr].node;
    }
    if (path.length > 0) path.unshift(sourceId);
    
    return { path, pathEdges };
  };

  return { distances, previous, getPathTo };
};

/**
 * Breadth-First Search (BFS) Traversal
 */
export const bfs = (nodes, edges, sourceId) => {
  const visited = new Set();
  const sequence = [];
  const queue = [sourceId];
  visited.add(sourceId);

  while (queue.length > 0) {
    const u = queue.shift();
    sequence.push(u);

    const neighbors = edges
      .filter(e => e.source === u || e.target === u)
      .map(e => (e.source === u ? e.target : e.source));

    for (const v of neighbors) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
      }
    }
  }
  return sequence;
};

/**
 * Depth-First Search (DFS) Traversal
 */
export const dfs = (nodes, edges, sourceId) => {
  const visited = new Set();
  const sequence = [];

  const visit = (u) => {
    visited.add(u);
    sequence.push(u);

    const neighbors = edges
      .filter(e => e.source === u || e.target === u)
      .map(e => (e.source === u ? e.target : e.source));

    for (const v of neighbors) {
      if (!visited.has(v)) {
        visit(v);
      }
    }
  };

  if (sourceId) visit(sourceId);
  return sequence;
};

/**
 * Prim's Algorithm for Minimum Spanning Tree (MST)
 */
export const getMST = (nodes, edges) => {
  if (nodes.length === 0) return { edges: [], cost: 0 };

  const mstEdges = [];
  const visited = new Set([nodes[0].id]);
  let totalCost = 0;

  // We loop until we've visited all nodes that are reachable
  // Not using visited.size < nodes.length to handle disconnected components
  while (true) {
    let minEdge = null;
    let minWeight = Infinity;

    for (const edge of edges) {
      const uIn = visited.has(edge.source);
      const vIn = visited.has(edge.target);

      // Edge connects seen area to unseen area
      if ((uIn && !vIn) || (!uIn && vIn)) {
        if (edge.weight < minWeight) {
          minWeight = edge.weight;
          minEdge = edge;
        }
      }
    }

    if (!minEdge) break;

    mstEdges.push(minEdge);
    totalCost += minWeight;
    visited.add(minEdge.source);
    visited.add(minEdge.target);
  }

  return { edges: mstEdges, cost: totalCost };
};

/**
 * Get Reachable nodes from source
 */
export const getReachability = (nodes, edges, sourceId) => {
  if (!sourceId) return [];
  const reachableNodes = new Set();
  const queue = [sourceId];
  reachableNodes.add(sourceId);

  while (queue.length > 0) {
    const u = queue.shift();
    const neighbors = edges
      .filter(e => e.source === u || e.target === u)
      .map(e => (e.source === u ? e.target : e.source));

    for (const v of neighbors) {
      if (!reachableNodes.has(v)) {
        reachableNodes.add(v);
        queue.push(v);
      }
    }
  }

  return Array.from(reachableNodes);
};

