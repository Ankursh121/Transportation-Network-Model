import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { QuadraticBezierLine, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGraphStore } from '../../store/useGraphStore';

const PulseParticle = ({ start, mid, end, offset = 0, speed = 0.5, color }) => {
  const meshRef = useRef();
  const [opacity, setOpacity] = useState(0.8);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.getElapsedTime() * speed) + offset) % 1;
      const position = new THREE.Vector3();
      
      const p0 = start;
      const p1 = mid;
      const p2 = end;
      
      position.x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
      position.y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
      position.z = Math.pow(1 - t, 2) * p0.z + 2 * (1 - t) * t * p1.z + Math.pow(t, 2) * p2.z;
      
      meshRef.current.position.copy(position);
      
      // Calculate opacity locally without mutation if possible, but for performance in useFrame:
      const alpha = t < 0.1 ? t * 10 : (t > 0.9 ? (1 - t) * 10 : 1);
      if (meshRef.current.material) {
        meshRef.current.material.opacity = alpha * 0.8;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};

const Edge3D = ({ edge, isHighlighted, isMST }) => {
  const nodes = useGraphStore((state) => state.nodes);
  
  const sourceNode = useMemo(() => nodes.find((n) => n.id === edge.source), [nodes, edge.source]);
  const targetNode = useMemo(() => nodes.find((n) => n.id === edge.target), [nodes, edge.target]);

  if (!sourceNode || !targetNode) return null;

  const start = useMemo(() => new THREE.Vector3(...sourceNode.position), [sourceNode.position]);
  const end = useMemo(() => new THREE.Vector3(...targetNode.position), [targetNode.position]);
  
  const mid = useMemo(() => {
    const m = new THREE.Vector3().lerpVectors(start, end, 0.5);
    const distance = start.distanceTo(end);
    
    // Push the midpoint outwards along its normal from the center
    // We ensure the midpoint is at least 1.5 units above the furthest node
    m.normalize().multiplyScalar(5 + distance * 0.4 + 1.2);
    
    return m;
  }, [start, end]);

  const color = isMST ? '#facc15' : (isHighlighted ? '#00f2ff' : '#4f46e5');
  const lineWidth = isMST ? 4 : (isHighlighted ? 3 : 0.5);
  const opacity = isHighlighted || isMST ? 1.0 : 0.15;

  return (
    <group>
      <QuadraticBezierLine
        start={start}
        end={end}
        mid={mid}
        color={color}
        lineWidth={lineWidth}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
      
      {/* Traveling flow particles */}
      {(isHighlighted || isMST) && (
        <>
          <PulseParticle start={start} mid={mid} end={end} offset={0} speed={0.8} color={color} />
          <PulseParticle start={start} mid={mid} end={end} offset={0.5} speed={0.8} color={color} />
        </>
      )}
      
      {/* Ambient flow for non-highlighted edges - stabilized */}
      {!isHighlighted && !isMST && nodes.length < 20 && (
        <PulseParticle start={start} mid={mid} end={end} offset={edge.id.length % 10 / 10} speed={0.3} color="#4f46e5" />
      )}
      
      {(isHighlighted || isMST) && (
        <Text
          position={[mid.x, mid.y + 0.4, mid.z]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {edge.weight}
        </Text>
      )}
    </group>
  );
};

export default Edge3D;



