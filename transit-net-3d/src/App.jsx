import React, { useEffect, useState, Suspense } from 'react';
import { useGraphStore } from './store/useGraphStore';
import ControlPanel from './components/layout/ControlPanel';
import OutputPanel from './components/layout/OutputPanel';
import GraphScene from './components/graph/GraphScene';
import Footer from './components/layout/Footer';
import { Info } from 'lucide-react';

function App() {
  const [showFooter, setShowFooter] = useState(false);
  const nodesCount = useGraphStore((state) => state.nodes.length);
  const edgesCount = useGraphStore((state) => state.edges.length);
  const generateRandomGraph = useGraphStore((state) => state.generateRandomGraph);

  useEffect(() => {
    generateRandomGraph();
  }, []); 

  return (
    <div className="w-full h-screen bg-[#010101] overflow-hidden antialiased">
      {/* Sliding Footer underneath the main application */}
      <Footer isVisible={showFooter} onClose={() => setShowFooter(false)} />

      {/* MAIN APPLICATION CONTAINER - Slides UP when footer opens */}
      <div 
         className={`relative w-full h-screen bg-[#030303] overflow-hidden flex flex-col font-sans transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
           showFooter ? 'translate-y-[-260px] scale-[0.98] rounded-b-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)]' : 'translate-y-0 scale-100 rounded-b-none shadow-none'
         }`}
         style={{ zIndex: 10 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a0a1a_0%,_#000_100%)] pointer-events-none z-0" />
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Suspense fallback={null}>
            <GraphScene />
          </Suspense>
        </div>

        <div className="relative z-10 w-full h-full pointer-events-none">
           <div className="pointer-events-auto contents">
              <ControlPanel />
              <OutputPanel />
           </div>
        </div>

        {/* Footer Toggle Button - Fixed within sliding container */}
        <button 
          onClick={() => setShowFooter(true)}
          className={`absolute bottom-10 right-10 z-30 px-8 py-3 glass-card rounded-full border border-white/10 text-white/60 hover:text-white hover:border-brand-cyan/50 hover:bg-brand-cyan/10 hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] hover:scale-105 transition-all duration-300 ${showFooter ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
        >
          <span className="text-[11px] uppercase font-black tracking-[0.3em]">Credits</span>
        </button>

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
    </div>
  );
}

export default App;
