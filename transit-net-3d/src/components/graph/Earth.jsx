import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

// Local asset imports
import earthImg from '../../assets/earth/earth.jpg';
import glowImg from '../../assets/earth/glow.png';

// GhostCat Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vp;
  varying vec3 vPositionNormal;
  void main(void){
    vUv = uv;
    vNormal = normalize( normalMatrix * normal );
    vp = position;
    vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

// GhostCat Fragment Shader with Stability Fixes
const fragmentShader = `
  uniform vec3 glowColor;
  uniform float bias;
  uniform float power;
  uniform float time;
  uniform float scale;
  uniform sampler2D map;
  varying vec3 vp;
  varying vec3 vNormal;
  varying vec3 vPositionNormal;
  varying vec2 vUv;

  void main(void){
    // max(0.0, ...) handles potential NaNs that cause GPU crashes
    float a = pow( max(0.0, bias + scale * abs(dot(vNormal, vPositionNormal))), power );
    vec4 texColor = texture2D( map, vUv );
    
    // GhostCat scan line logic
    float scanLine = 0.0;
    if(vp.y > time && vp.y < time + 20.0) {
      scanLine = smoothstep(0.0, 0.8, (1.0 - abs(0.5 - (vp.y - time) / 20.0)) / 3.0);
    }
    
    vec4 finalGlow = vec4(glowColor, 1.0) * a;
    vec4 finalScan = vec4(glowColor, 1.0) * scanLine * scanLine;
    
    gl_FragColor = texColor + finalGlow + finalScan;
  }
`;

const apertureVertexShader = `
  varying vec3 vVertexNormal;
  varying vec3 vVertexWorldPosition;
  void main(){
    vVertexNormal = normalize(normalMatrix * normal);
    vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const apertureFragmentShader = `
  uniform vec3 glowColor;
  uniform float coeficient;
  uniform float power;
  varying vec3 vVertexNormal;
  varying vec3 vVertexWorldPosition;
  void main(){
    vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
    vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
    viewCameraToVertex = normalize(viewCameraToVertex);
    // Added stability clamp to intensity
    float intensity = pow(max(0.0, coeficient + dot(vVertexNormal, viewCameraToVertex)), power);
    gl_FragColor = vec4(glowColor, intensity);
  }
`;

const Earth = () => {
  const meshRef = useRef();
  
  // Load local textures
  const [earthTex, glowTex] = useLoader(THREE.TextureLoader, [earthImg, glowImg]);

  const uniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color(0x0cd1eb) },
    scale: { value: -1.0 },
    bias: { value: 1.0 },
    power: { value: 3.3 },
    time: { value: 100.0 },
    map: { value: earthTex }
  }), [earthTex]);

  const apertureUniforms = useMemo(() => ({
    coeficient: { value: 1.0 },
    power: { value: 3.0 },
    glowColor: { value: new THREE.Color(0x4390d1) }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.time.value -= 0.5;
      if (uniforms.time.value < -100) uniforms.time.value = 100;
      
      // Gentle self-rotation
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* 1. The Main Shader Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 48, 48]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
        />
      </mesh>

      {/* 2. Outer Bloom Sprite */}
      <sprite scale={[15, 15, 1]}>
        <spriteMaterial 
          map={glowTex} 
          color="#4390d1" 
          transparent={true} 
          opacity={0.6} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* 3. Atmospheric Aperture (GhostCat Signature) */}
      <mesh>
        <sphereGeometry args={[5.01, 48, 48]} />
        <shaderMaterial
          vertexShader={apertureVertexShader}
          fragmentShader={apertureFragmentShader}
          uniforms={apertureUniforms}
          transparent={true}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Fine Digital Grid */}
      <Sphere args={[5.05, 48, 48]}>
         <meshBasicMaterial 
            color="#81ffff" 
            transparent={true} 
            opacity={0.03} 
            wireframe={true}
         />
      </Sphere>
    </group>
  );
};

export default Earth;
