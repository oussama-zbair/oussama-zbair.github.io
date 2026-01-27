import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingOrbProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({
  position,
  color,
  scale = 1,
  speed = 1,
  distort = 0.4,
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Sphere ref={mesh} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

export default FloatingOrb;
