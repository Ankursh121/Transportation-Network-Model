import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Ruler, Waypoints, Zap, Info } from 'lucide-react';
import { useGraphStore } from '../../store/useGraphStore';

const OutputPanel = () => {
  const { algorithmResult, nodes, edges } = useGraphStore();

  if (!algorithmResult) return null;

  return (
    <div className="absolute top-4 right-4 w-80 max-h-[calc(100vh-32px)] overflow-y-auto pointer-events-none z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={algorithmResult.type + (algorithmResult.subtype || '')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="glass p-6 rounded-2xl pointer-events-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-blue/20 rounded-lg">
              {algorithmResult.type === 'shortestPath' && <Ruler className="text-brand-blue" size={20} />}
              {algorithmResult.type === 'traversal' && <Waypoints className="text-brand-purple" size={20} />}
              {algorithmResult.type === 'reachability' && <Zap className="text-brand-cyan" size={20} />}
              {algorithmResult.type === 'mst' && <Network className="text-yellow-400" size={20} />}
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-white">
                {algorithmResult.type === 'shortestPath' && 'Dijkstra Result'}
                {algorithmResult.type === 'traversal' && `${algorithmResult.subtype} Traversal`}
                {algorithmResult.type === 'reachability' && 'Reachability Analysis'}
                {algorithmResult.type === 'mst' && 'MST (Prim\'s)'}
              </h2>
              <p className="text-[10px] text-white/50">Algorithm Execution Successful</p>
            </div>
          </div>

          <div className="space-y-4">
            {algorithmResult.type === 'shortestPath' && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase">Distances from Source</label>
                <div className="grid gap-1.5">
                  {Object.entries(algorithmResult.distances).map(([id, dist]) => {
                    const node = nodes.find(n => n.id === id);
                    return (
                      <div key={id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-xs">
                        <span className="text-white/70">{node?.name}</span>
                        <span className="font-mono font-bold text-brand-blue">
                          {dist === Infinity ? 'Unreachable' : (Number.isInteger(dist) ? dist : Number(dist).toFixed(2))}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {algorithmResult.type === 'traversal' && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-white/40 uppercase">Visit Sequence</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {algorithmResult.sequence.map((id, index) => {
                    const node = nodes.find(n => n.id === id);
                    return (
                      <div key={id} className="flex items-center gap-2">
                        <div className="bg-brand-purple/20 text-brand-purple border border-brand-purple/30 px-2 py-1 rounded-md font-bold">
                          {node?.name}
                        </div>
                        {index < algorithmResult.sequence.length - 1 && <span className="text-white/20">→</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {algorithmResult.type === 'reachability' && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase block mb-2">Summary</label>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Found <span className="text-brand-cyan font-bold">{algorithmResult.reachable.length}</span> reachable cities from the current source.
                    The network coverage is <span className="text-brand-cyan font-bold">
                      {Math.round((algorithmResult.reachable.length / nodes.length) * 100)}%
                    </span>.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-500/10 border border-green-500/20 p-2 rounded-lg">
                    <div className="text-[8px] text-green-500/70 font-bold uppercase mb-1">Reachable</div>
                    <div className="text-lg font-bold text-green-400">{algorithmResult.reachable.length}</div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                    <div className="text-[8px] text-red-500/70 font-bold uppercase mb-1">Unreachable</div>
                    <div className="text-lg font-bold text-red-400">{nodes.length - algorithmResult.reachable.length}</div>
                  </div>
                </div>
              </div>
            )}

            {algorithmResult.type === 'mst' && (
              <div className="space-y-4">
                <div className="bg-yellow-400/10 border border-yellow-400/20 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-yellow-500/70 font-bold uppercase mb-1">Minimum Spanning Tree Cost</div>
                  <div className="text-3xl font-black text-yellow-400">{algorithmResult.cost}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase block mb-2">Selected Edges</label>
                  <div className="grid gap-1.5 max-h-40 overflow-y-auto pr-1">
                    {algorithmResult.edges.map(edgeId => {
                      const edge = edges.find(e => e.id === edgeId);
                      if (!edge) return null;
                      const u = nodes.find(n => n.id === edge.source);
                      const v = nodes.find(n => n.id === edge.target);
                      return (
                        <div key={edge.id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg text-xs">
                          <span className="text-white/70">{u?.name} ↔ {v?.name}</span>
                          <span className="font-bold text-yellow-400/80">{edge.weight}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => useGraphStore.getState().setAlgorithmResult(null)}
              className="text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/5"
            >
              Dismiss Result
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OutputPanel;
