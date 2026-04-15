import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Environment, ContactShadows, Float, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as POSTPROCESSING from 'postprocessing';
import * as THREE from 'three';
import Node3D from './Node3D';
import Edge3D from './Edge3D';
import Earth from './Earth';
import { useGraphStore } from '../../store/useGraphStore';

const EarthFallback = () => (
  <group>
    <Sphere args={[3, 32, 32]}>
      <meshStandardMaterial 
        color="#00d2ff" 
        emissive="#00d2ff" 
        emissiveIntensity={1} 
        wireframe 
        transparent 
        opacity={0.3} 
      />
    </Sphere>
    <Sphere args={[2.9, 16, 16]}>
      <meshBasicMaterial color="#00d2ff" transparent opacity={0.05} />
    </Sphere>
  </group>
);

const GraphScene = () => {
  const { nodes, edges, sourceNode, algorithmResult, currentStep } = useGraphStore();

  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 15, 35], fov: 40 }}
        gl={{ antialias: false, stencil: false, depth: true }}
      >
        <color attach="background" args={['#010103']} />
        <fog attach="fog" args={['#010103', 20, 70]} />
        
        <OrbitControls 
          makeDefault 
          enableDamping 
          dampingFactor={0.06} 
          minDistance={10} 
          maxDistance={60}
          autoRotate={!algorithmResult}
          autoRotateSpeed={0.4}
        />
        
        {/* Cinematic Lighting System */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[20, 30, 20]} 
          angle={0.2} 
          penumbra={1} 
          intensity={3} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-15, -15, -15]} intensity={1.5} color="#4f46e5" />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#00d2ff" />
        
        <Suspense fallback={null}>
          <group>
            {/* The Earth Visualization with its own loading state */}
            <Suspense fallback={<EarthFallback />}>
              <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
                <Earth />
              </Float>
            </Suspense>
            
            {/* Edge Rendering */}
            <group>
              {edges.map((edge) => {
                const edgeIndex = algorithmResult?.type === 'shortestPath' 
                  ? algorithmResult.pathEdges.indexOf(edge.id)
                  : -1;
                const isHighlighted = edgeIndex !== -1 && edgeIndex < currentStep;
                const isMST = algorithmResult?.type === 'mst' && 
                  algorithmResult.edges.some(e => e.id === edge.id);

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

            {/* Node Rendering */}
            <group>
              {nodes.map((node) => {
                const isSource = sourceNode === node.id;
                const nodeIndexInTraversal = algorithmResult?.type === 'traversal' 
                  ? algorithmResult.sequence.indexOf(node.id) 
                  : -1;
                const isTraversed = nodeIndexInTraversal !== -1 && nodeIndexInTraversal <= currentStep;
                
                const isReachable = algorithmResult?.type === 'reachability' && 
                  algorithmResult.reachable.includes(node.id);
                  
                const isUnreachable = algorithmResult?.type === 'reachability' && 
                  !algorithmResult.reachable.includes(node.id);

                return (
                  <Node3D 
                    key={node.id} 
                    node={node} 
                    isSource={isSource}
                    isTraversed={isTraversed}
                    isReachable={isReachable}
                    isUnreachable={isUnreachable}
                  />
                );
              })}
            </group>
          </group>

          {/* Environment & Visual Polish */}
          <Stars radius={120} depth={60} count={8000} factor={6} saturation={0} fade speed={0.4} />
          <Environment preset="night" blur={0.8} />
          
          <ContactShadows 
            position={[0, -10, 0]} 
            opacity={0.4} 
            scale={50} 
            blur={3} 
            far={15} 
            color="#000000"
          />

          {/* Premium Post-Processing */}
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              intensity={1.0} 
              levels={7}
              radius={0.4} 
            />
            <Noise opacity={0.02} />
            <Vignette darkness={1.0} offset={0.1} />
            <ChromaticAberration
              blendFunction={POSTPROCESSING.BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0004, 0.0004)}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GraphScene;
