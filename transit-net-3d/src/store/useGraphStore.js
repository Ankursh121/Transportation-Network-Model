import { create } from 'zustand';

export const useGraphStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  sourceNode: null,
  targetNode: null,
  algorithmResult: null,
  currentStep: -1,
  isProcessing: false,
  
  addNode: (name) => {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos(2 * Math.random() - 1);
    const radius = 6 + Math.random() * 2;
    
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    const newNode = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      position: [x, y, z],
      color: '#6366f1',
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },
  
  removeNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNode: state.selectedNode === id ? null : state.selectedNode,
      sourceNode: state.sourceNode === id ? null : state.sourceNode,
    }));
  },
  
  addEdge: (sourceId, targetId, weight) => {
    if (sourceId === targetId) return;
    const existingEdge = get().edges.find(
      (e) => (e.source === sourceId && e.target === targetId) || 
             (e.source === targetId && e.target === sourceId)
    );
    if (existingEdge) return;
    
    const newEdge = {
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      weight: parseFloat(weight),
      color: '#4f46e5',
    };
    set((state) => ({ edges: [...state.edges, newEdge] }));
  },
  
  removeEdge: (id) => {
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== id),
    }));
  },
  
  setSelectedNode: (id) => set({ selectedNode: id }),
  setSourceNode: (id) => set({ sourceNode: id }),
  setTargetNode: (id) => set({ targetNode: id }),
  
  setAlgorithmResult: (result) => set({ algorithmResult: result, currentStep: 0 }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setIsProcessing: (val) => set({ isProcessing: val }),
  
  resetGraph: () => set({ 
    nodes: [], 
    edges: [], 
    algorithmResult: null, 
    currentStep: -1,
    sourceNode: null, 
    selectedNode: null 
  }),
  
  generateRandomGraph: () => {
    const nodeCount = 8;
    const newNodes = Array.from({ length: nodeCount }).map((_, i) => {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const radius = 6 + Math.random() * 2;
      
      return {
        id: `node-${i}`,
        name: `City ${String.fromCharCode(65 + i)}`,
        position: [
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta)
        ],
        color: '#6366f1',
      };
    });
    
    const newEdges = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.6) {
          newEdges.push({
            id: `edge-${i}-${j}`,
            source: `node-${i}`,
            target: `node-${j}`,
            weight: Math.floor(Math.random() * 20) + 1,
            color: '#4f46e5',
          });
        }
      }
    }
    
    set({ 
      nodes: newNodes, 
      edges: newEdges, 
      algorithmResult: null,
      sourceNode: null,
      selectedNode: null
    });
  }
}));


