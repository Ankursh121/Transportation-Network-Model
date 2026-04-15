import React, { useEffect } from 'react';
import GraphScene from './components/graph/GraphScene';
import ControlPanel from './components/layout/ControlPanel';
import OutputPanel from './components/layout/OutputPanel';
import { useGraphStore } from './store/useGraphStore';

function App() {
  const generateRandomGraph = useGraphStore((state) => state.generateRandomGraph);

  // Initialize with a random graph on first load
  useEffect(() => {
    generateRandomGraph();
  }, [generateRandomGraph]);

  return (
    <div className="relative w-full h-full bg-[#030303] overflow-hidden">
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none z-0" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <GraphScene />
      </div>

      {/* Overlays */}
      <ControlPanel />
      <OutputPanel />

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-brand-blue/20 pointer-events-none m-4 rounded-tl-3xl z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-brand-purple/20 pointer-events-none m-4 rounded-br-3xl z-10" />
      
      {/* Status Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full z-10 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
          <span className="text-[10px] font-bold uppercase text-white/60 tracking-tighter">System Ready</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10" />
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase font-black leading-none">Nodes</span>
            <span className="text-sm font-bold text-white leading-none">{useGraphStore((state) => state.nodes.length)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-white/30 uppercase font-black leading-none">Edges</span>
            <span className="text-sm font-bold text-white leading-none">{useGraphStore((state) => state.edges.length)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
