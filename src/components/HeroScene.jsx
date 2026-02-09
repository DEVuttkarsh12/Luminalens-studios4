import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#333" />
      <spotLight position={[0, 5, 10]} angle={0.4} penumbra={1} intensity={2} />

      {/* Sculpture and Stars removed to favor video background transition */}

      <fog attach="fog" args={['#080808', 5, 15]} />
    </>
  );
};

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <group scale={isMobile ? 0.7 : 1}>
          <Scene />
        </group>
      </Canvas>
    </div>
  );
}
