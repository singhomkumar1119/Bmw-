// App.jsx
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import { Suspense } from 'react';
import Showroom from './components/Showroom';
import IntroSequence from './components/IntroSequence';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={['#020202']} />
        
        {/* Cinematic High-Contrast Lighting */}
        <ambientLight intensity={0.1} />
        <spotLight 
          position={[0, 10, 5]} 
          angle={0.4} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#ffffff" 
        />
        <spotLight 
          position={[-5, 5, -5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={1} 
          color="#0055ff" // Subtle BMW blue rim lighting
        />

        <Suspense fallback={null}>
          <IntroSequence />
          <Showroom />
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

