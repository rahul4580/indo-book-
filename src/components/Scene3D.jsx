'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot, Environment } from '@react-three/drei';

function MovingShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y = Math.sin(time) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.1} 
            metalness={0.8}
            emissive="#1a1a1a"
            emissiveIntensity={0.5}
        />
      </TorusKnot>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <MovingShape />
      </Canvas>
    </div>
  );
}
