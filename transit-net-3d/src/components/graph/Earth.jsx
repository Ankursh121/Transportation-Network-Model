import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const meshRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.1;
    if (innerRef.current) innerRef.current.rotation.y = -t * 0.15;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.2;
  });

  return (
    <group>
      {/* Core Glow */}
      <Sphere ref={innerRef} args={[2.8, 32, 32]}>
        <meshStandardMaterial 
          color="#1e1b4b" 
          emissive="#4338ca" 
          emissiveIntensity={2} 
          roughness={0} 
        />
      </Sphere>

      {/* Wireframe Continent Shell */}
      <Sphere ref={meshRef} args={[3, 32, 32]}>
        <meshStandardMaterial 
          color="#00d2ff" 
          emissive="#00d2ff" 
          emissiveIntensity={1.5} 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </Sphere>

      {/* Atmospheric Halo */}
      <Sphere args={[3.3, 32, 32]}>
        <meshPhongMaterial
          color="#00f2fe"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Decorative Data Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[4.2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default Earth;



