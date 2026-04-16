import React, { useState } from 'react';
import { Plus, Trash2, Play, RefreshCw, Shuffle, Info } from 'lucide-react';
import { useGraphStore } from '../../store/useGraphStore';
import { dijkstra, bfs, dfs, getReachability, getMST } from '../../algorithms/graphAlgorithms';

const ControlPanel = () => {
  const { 
    nodes, edges, addNode, removeNode, addEdge, removeEdge, 
    selectedNode, setSelectedNode,
    sourceNode, setSourceNode, algorithmResult, setAlgorithmResult, 
    currentStep, setCurrentStep, resetGraph, generateRandomGraph 
  } = useGraphStore();

  const [cityName, setCityName] = useState('');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('10');

  // Animation playback
  React.useEffect(() => {
    let interval;
    if (algorithmResult && (algorithmResult.type === 'traversal' || algorithmResult.type === 'shortestPath')) {
      const maxSteps = algorithmResult.type === 'traversal' 
        ? algorithmResult.sequence.length 
        : algorithmResult.pathEdges.length;
        
      if (currentStep < maxSteps) {
        interval = setInterval(() => {
          setCurrentStep(currentStep + 1);
        }, 800);
      }
    }
    return () => clearInterval(interval);
  }, [algorithmResult, currentStep, setCurrentStep]);


  const handleAddNode = () => {
    if (cityName.trim()) {
      addNode(cityName);
      setCityName('');
    }
  };

  const handleAddEdge = () => {
    if (edgeSource && edgeTarget && edgeWeight) {
      addEdge(edgeSource, edgeTarget, edgeWeight);
    }
  };

  const runDijkstra = () => {
    if (nodes.length < 5) return alert('Minimum 5 cities required for engineering analysis.');
    if (!sourceNode) return alert('Select a source node first (click a node and set as source)');
    const result = dijkstra(nodes, edges, sourceNode);
    
    // Convert previous mapping to path edges for highlighting
    // This is a simplified version, ideally we'd show paths to all nodes
    const pathEdges = [];
    Object.keys(result.previous).forEach(targetId => {
      let curr = targetId;
      while (result.previous[curr]) {
        pathEdges.push(result.previous[curr].edgeId);
        curr = result.previous[curr].node;
      }
    });

    setAlgorithmResult({
      type: 'shortestPath',
      distances: result.distances,
      pathEdges
    });
  };

  const runBFS = () => {
    if (nodes.length < 5) return alert('Minimum 5 cities required.');
    if (!sourceNode) return alert('Select source node');
    const sequence = bfs(nodes, edges, sourceNode);
    setAlgorithmResult({ type: 'traversal', subtype: 'BFS', sequence });
  };

  const runDFS = () => {
    if (nodes.length < 5) return alert('Minimum 5 cities required.');
    if (!sourceNode) return alert('Select source node');
    const sequence = dfs(nodes, edges, sourceNode);
    setAlgorithmResult({ type: 'traversal', subtype: 'DFS', sequence });
  };

  const runReachability = () => {
    if (nodes.length < 5) return alert('Minimum 5 cities required.');
    if (!sourceNode) return alert('Select source node');
    const reachable = getReachability(nodes, edges, sourceNode);
    setAlgorithmResult({ type: 'reachability', reachable });
  };

  const runMST = () => {
    if (nodes.length < 5) return alert('Minimum 5 cities required.');
    const result = getMST(nodes, edges);
    setAlgorithmResult({ 
      type: 'mst', 
      edges: result.edges.map(e => e.id), 
      cost: result.cost 
    });
  };

  return (
    <div className="absolute top-4 left-4 w-80 max-h-[calc(100vh-32px)] flex flex-col gap-4 overflow-y-auto z-10 p-1">
      <div className="glass p-6 rounded-2xl">
        <h1 className="text-xl font-black text-white leading-tight mb-1 uppercase tracking-tighter">
          Transportation<br/>
          <span className="text-brand-blue text-2xl">Network</span> Model
        </h1>
        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-6">Advanced 3D Simulator</p>

        {/* Node controls */}
        <section className="space-y-3 mb-6">
          <label className="text-xs font-bold text-white/70 uppercase">Manage Cities</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-blue/50 transition-colors"
            />
            <button
              onClick={handleAddNode}
              className="bg-brand-blue hover:bg-brand-blue/80 text-black p-2 rounded-lg transition-all active:scale-95"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="max-h-24 overflow-y-auto space-y-1 pr-1 border-b border-white/5 pb-3">
            {nodes.map(node => (
              <div key={node.id} 
                onClick={() => setSelectedNode(node.id)}
                className={`flex items-center justify-between p-1.5 px-3 rounded-lg text-xs group cursor-pointer transition-colors ${selectedNode === node.id ? 'bg-brand-blue/20' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <span className={sourceNode === node.id ? 'text-red-400 font-bold' : ''}>
                  {node.name} {sourceNode === node.id && '(Source)'}
                </span>
                <button onClick={(e) => { e.stopPropagation(); removeNode(node.id); }} className="text-white/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Selection Action */}
          {selectedNode && (
            <div className="pt-2">
              <button 
                onClick={() => setSourceNode(selectedNode)}
                className="w-full bg-brand-blue/10 hover:bg-brand-blue/30 text-brand-blue border border-brand-blue/30 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Set {nodes.find(n => n.id === selectedNode)?.name} as Source
              </button>
            </div>
          )}
        </section>

        {/* Edge / Road Management */}
        <section className="space-y-3 mb-6">
          <label className="text-xs font-bold text-white/70 uppercase flex items-center gap-2">
            <Shuffle size={12} className="text-brand-purple" /> Build Route
          </label>
          
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl space-y-3">
            <div className="grid grid-cols-[1fr_20px_1fr] items-center gap-2">
              <div className="space-y-1">
                <span className="text-[9px] text-white/40 uppercase font-bold px-1">From</span>
                <select 
                  value={edgeSource} 
                  onChange={(e) => setEdgeSource(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-2 text-[11px] focus:outline-none focus:border-brand-blue/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#111]">Origin</option>
                  {nodes.map(n => <option key={n.id} value={n.id} className="bg-[#111]">{n.name}</option>)}
                </select>
              </div>

              <div className="flex justify-center pt-4">
                <div className="w-4 h-[1px] bg-white/20" />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-white/40 uppercase font-bold px-1">To</span>
                <select 
                  value={edgeTarget} 
                  onChange={(e) => setEdgeTarget(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-2 text-[11px] focus:outline-none focus:border-brand-blue/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#111]">Destination</option>
                  {nodes.map(n => <option key={n.id} value={n.id} className="bg-[#111]">{n.name}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-1">
                <span className="text-[9px] text-white/40 uppercase font-bold px-1">Route Distance</span>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="E.g. 10"
                    value={edgeWeight}
                    onChange={(e) => setEdgeWeight(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-purple/50"
                  />
                </div>
              </div>
              <button
                onClick={handleAddEdge}
                disabled={!edgeSource || !edgeTarget}
                className="bg-brand-blue hover:bg-brand-blue/80 text-black px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-20 disabled:grayscale uppercase"
              >
                Link
              </button>
            </div>
          </div>
        </section>

        {/* Algorithm controls */}
        <section className="space-y-2">
          <label className="text-xs font-bold text-white/70 uppercase flex items-center justify-between">
            Analysis
            {!sourceNode && <span className="text-[9px] text-red-500 animate-pulse font-black">Source Needed</span>}
          </label>
          
           {!sourceNode ? (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
               <p className="text-[10px] text-red-400 font-bold mb-2">Select a city and click "Set as Source" to begin analysis.</p>
               {selectedNode ? (
                 <button 
                   onClick={() => setSourceNode(selectedNode)}
                   className="w-full bg-brand-blue hover:bg-brand-blue/80 text-black py-2 rounded-lg text-xs font-black uppercase transition-all shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                 >
                   Set {nodes.find(n => n.id === selectedNode)?.name} as Source
                 </button>
               ) : (
                 <p className="text-[9px] text-white/30 italic">Click a city in the list or 3D view</p>
               )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={runDijkstra}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg text-[10px] uppercase font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Play size={10} className="text-brand-cyan" /> Dijkstra
              </button>
              <button 
                onClick={runMST}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg text-[10px] uppercase font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Play size={10} className="text-yellow-400" /> MST
              </button>
              <button 
                onClick={runBFS}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg text-[10px] uppercase font-bold transition-colors"
              >
                BFS
              </button>
              <button 
                onClick={runDFS}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg text-[10px] uppercase font-bold transition-colors"
              >
                DFS
              </button>
              <button 
                onClick={runReachability}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-lg text-[10px] uppercase font-bold col-span-2 transition-colors"
              >
                Reachability
              </button>
            </div>
          )}
        </section>

        <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-white/10">
          <button 
            onClick={generateRandomGraph}
            className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-white/50 hover:text-white transition-colors"
          >
            <Shuffle size={14} /> Random
          </button>
          <button 
            onClick={resetGraph}
            className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-red-500/70 hover:text-red-500 transition-colors"
          >
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="glass p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Info size={14} className="text-brand-blue" />
          <span className="text-[10px] uppercase font-bold text-white/70">Instruction</span>
        </div>
        <ul className="text-[10px] text-white/50 space-y-1 list-disc pl-4">
          <li>Minimum 5 nodes required for full analysis.</li>
          <li>Click a node to select it or set as Source.</li>
          <li>Red nodes indicate the Starting Point.</li>
          <li>Labels appear when hovering or in results.</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
