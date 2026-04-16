import React, { useEffect, useState, Suspense } from 'react';
import { useGraphStore } from './store/useGraphStore';
import ControlPanel from './components/layout/ControlPanel';
import OutputPanel from './components/layout/OutputPanel';

import GraphScene from './components/graph/GraphScene';

function App() {
  const nodesCount = useGraphStore((state) => state.nodes.length);
  const edgesCount = useGraphStore((state) => state.edges.length);
  const generateRandomGraph = useGraphStore((state) => state.generateRandomGraph);

  useEffect(() => {
    generateRandomGraph();
  }, []); // Only run once on mount

  return (
    <div className="relative w-full h-screen bg-[#030303] overflow-hidden flex flex-col font-sans">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a0a1a_0%,_#000_100%)] pointer-events-none z-0" />
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={null}>
          <GraphScene />
        </Suspense>
      </div>

      {/* DASHBOARD LAYER */}
      <div className="relative z-10 w-full h-full pointer-events-none">
         <div className="pointer-events-auto contents">
            <ControlPanel />
            <OutputPanel />
         </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full z-10 flex items-center gap-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
          <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest">System Ready</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10" />
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase font-black leading-none">Nodes</span>
            <span className="text-sm font-bold text-white leading-none">{nodesCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase font-black leading-none">Edges</span>
            <span className="text-sm font-bold text-white leading-none">{edgesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
