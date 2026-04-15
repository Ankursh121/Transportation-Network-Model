import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useGraphStore } from '../../store/useGraphStore';

const Node3D = ({ node, isSource, isHighlighted, isTraversed, isReachable, isUnreachable }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const selectedNode = useGraphStore((state) => state.selectedNode);
  const currentStep = useGraphStore((state) => state.currentStep);
  const algorithmResult = useGraphStore((state) => state.algorithmResult);
  const setSelectedNode = useGraphStore((state) => state.setSelectedNode);
  const setSourceNode = useGraphStore((state) => state.setSourceNode);

  const isSelected = selectedNode === node.id;

  // Pulse animation logic
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (glowRef.current) {
      const s = 1.2 + Math.sin(t * 3 + node.position[0]) * 0.1;
      glowRef.current.scale.set(s, s, s);
    }
    
    if (meshRef.current) {
      // Smoothly interpolate scale on hover
      const targetScale = hovered || isSelected ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // Determine color
  const color = useMemo(() => {
    const nodeIndexInTraversal = algorithmResult?.type === 'traversal' 
      ? algorithmResult.sequence.indexOf(node.id) 
      : -1;
    const isCurrentTraversed = nodeIndexInTraversal !== -1 && nodeIndexInTraversal <= currentStep;

    if (isSource) return '#ff3e3e'; // Vibrant Red
    if (isSelected) return '#00f2ff'; // Neon Cyan
    if (isCurrentTraversed) return '#ffaa00'; // Safety Orange
    if (isReachable) return '#4ade80'; // Emerald Green
    if (isUnreachable) return '#451a03'; // Deep Earth
    if (isHighlighted) return '#a855f7'; // Electric Purple
    return node.color || '#6366f1';
  }, [node, isSource, isSelected, isTraversed, isReachable, isUnreachable, isHighlighted, algorithmResult, currentStep]);

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core Sphere */}
        <Sphere
          ref={meshRef}
          args={[0.3, 32, 32]}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedNode(node.id);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setSourceNode(node.id);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered || isSelected ? 4 : 1.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>

        {/* Outer Glow Pulse */}
        <Sphere ref={glowRef} args={[0.35, 32, 32]}>
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Orbiting Ring for Selected/Source */}
        {(isSelected || isSource) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.55, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}

        <Text
          position={[0, 0.7, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {node.name}
        </Text>
      </Float>

      {/* Interactive Tooltip */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10} position={[0, 1.2, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-2xl min-w-[120px] pointer-events-auto transform transition-all duration-300 scale-100">
            <h3 className="font-bold text-white text-sm mb-1">{node.name}</h3>
            <div className="flex flex-col gap-2 mt-2">
              <button 
                className="w-full text-left text-[10px] px-2 py-1.5 bg-brand-blue/20 hover:bg-brand-blue/50 text-brand-blue-light rounded-md border border-brand-blue/30 transition-colors"
                onClick={() => setSourceNode(node.id)}
              >
                Set as Origin
              </button>
              <div className="h-[1px] bg-white/10 w-full" />
              <p className="text-[9px] text-gray-400 italic">ID: {node.id.slice(0, 8)}</p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Node3D;

