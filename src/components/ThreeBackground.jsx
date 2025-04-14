import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const points = useRef();
  
  useFrame((state) => {
    points.current.rotation.y += 0.001;
    points.current.rotation.x += 0.001;
  });

  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 10;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(theta);
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4f46e5" sizeAttenuation transparent />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground; 