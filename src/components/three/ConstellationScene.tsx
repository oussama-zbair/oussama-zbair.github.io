import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import StarField from './StarField';
import FloatingOrb from './FloatingOrb';

const ConstellationScene: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <Suspense fallback={null}>
          <StarField count={3000} />
          
          {/* Main identity orb */}
          <FloatingOrb 
            position={[0, 0, 0]} 
            color="#a855f7" 
            scale={2.5} 
            speed={0.5} 
            distort={0.3}
          />
          
          {/* Skill orbs orbiting */}
          <FloatingOrb 
            position={[-6, 2, -3]} 
            color="#06b6d4" 
            scale={0.8} 
            speed={1.2} 
          />
          <FloatingOrb 
            position={[5, -1, -2]} 
            color="#ec4899" 
            scale={0.6} 
            speed={0.8} 
          />
          <FloatingOrb 
            position={[-3, -3, 2]} 
            color="#22c55e" 
            scale={0.5} 
            speed={1.5} 
          />
          <FloatingOrb 
            position={[4, 3, 1]} 
            color="#f59e0b" 
            scale={0.4} 
            speed={1} 
          />
          
          <Environment preset="night" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default ConstellationScene;
