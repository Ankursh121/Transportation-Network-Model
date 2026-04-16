import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Float } from '@react-three/drei';
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

  // Use a stable vector for lerping to avoid garbage collection
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (glowRef.current) {
      const s = 1.2 + Math.sin(t * 3 + node.position[0]) * 0.1;
      glowRef.current.scale.set(s, s, s);
    }
    
    if (meshRef.current) {
      const targetScale = hovered || isSelected ? 1.4 : 1;
      tempVec.set(targetScale, targetScale, targetScale);
      meshRef.current.scale.lerp(tempVec, 0.1);
    }
  });

  const color = useMemo(() => {
    const nodeIndexInTraversal = algorithmResult?.type === 'traversal' 
      ? algorithmResult.sequence.indexOf(node.id) 
      : -1;
    const isCurrentTraversed = nodeIndexInTraversal !== -1 && nodeIndexInTraversal <= currentStep;

    if (isSource) return '#ff3e3e';
    if (isSelected) return '#00f2ff';
    if (isCurrentTraversed) return '#ffaa00';
    if (isReachable) return '#4ade80';
    if (isUnreachable) return '#451a03';
    if (isHighlighted) return '#a855f7';
    return node.color || '#6366f1';
  }, [node, isSource, isSelected, isTraversed, isReachable, isUnreachable, isHighlighted, algorithmResult, currentStep]);

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere
          ref={meshRef}
          args={[0.3, 16, 16]} // Reduced segments for stability
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

        <Sphere ref={glowRef} args={[0.35, 16, 16]}>
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {(isSelected || isSource) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.55, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Replaced Html with native 3D Text for better performance */}
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
    </group>
  );
};

export default Node3D;
