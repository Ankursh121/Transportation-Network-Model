import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Preload, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Node3D from './Node3D';
import Edge3D from './Edge3D';
import Earth from './Earth';
import { useGraphStore } from '../../store/useGraphStore';

const GraphScene = () => {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const sourceNode = useGraphStore((state) => state.sourceNode);
  const selectedNode = useGraphStore((state) => state.selectedNode);
  const algorithmResult = useGraphStore((state) => state.algorithmResult);
  const currentStep = useGraphStore((state) => state.currentStep);

  const glConfig = useMemo(() => ({
    antialias: false,
    alpha: false, // Changed to false for better performance
    powerPreference: "default",
    stencil: false,
    depth: true,
  }), []);

  return (
    <div className="w-full h-full bg-[#000000]">
      <Canvas
        dpr={1} // Strictly one pixel per physical pixel
        shadows={false}
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={glConfig}
      >
        <OrbitControls 
          enablePan={false} 
          minDistance={8} 
          maxDistance={35} 
          autoRotate={true} 
          autoRotateSpeed={0.5} 
        />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d2ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={7} saturation={0.8} fade speed={1.5} />
        <Stars radius={150} depth={100} count={2000} factor={10} saturation={1} fade speed={0.5} />
        <Stars radius={200} depth={10} count={1000} factor={5} saturation={0.5} fade speed={0.2} />
        
        <Suspense fallback={null}>
          <Earth />
          
          <group>
            {edges.map((edge) => {
              const isHighlighted = algorithmResult?.pathEdges?.includes(edge.id);
              const isMST = algorithmResult?.type === 'mst' && algorithmResult?.edges?.includes(edge.id);
              return (
                <Edge3D 
                  key={edge.id} 
                  edge={edge} 
                  isHighlighted={isHighlighted} 
                  isMST={isMST} 
                />
              );
            })}
          </group>

          <group>
            {nodes.map((node) => {
              const isSource = sourceNode === node.id;
              const nodeIndexInTraversal = algorithmResult?.type === 'traversal' 
                ? algorithmResult.sequence.indexOf(node.id) 
                : -1;
              const isTraversed = nodeIndexInTraversal !== -1 && nodeIndexInTraversal <= currentStep;
              const isReachable = algorithmResult?.type === 'reachability' && algorithmResult.reachable.includes(node.id);
              const isUnreachable = algorithmResult?.type === 'reachability' && !algorithmResult.reachable.includes(node.id);

              return (
                <Node3D
                  key={node.id}
                  node={node}
                  isSource={isSource}
                  isTraversed={isTraversed}
                  isReachable={isReachable}
                  isUnreachable={isUnreachable}
                  isHighlighted={selectedNode === node.id}
                />
              );
            })}
          </group>
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GraphScene;
