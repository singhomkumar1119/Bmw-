// components/IntroSequence.jsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial } from '@react-three/drei';
import gsap from 'gsap';

export default function IntroSequence() {
  const logoRef = useRef();

  useEffect(() => {
    // GSAP animation for logo solidifying and camera push-through
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current.scale, 
      { x: 0, y: 0, z: 0 }, 
      { x: 1, y: 1, z: 1, duration: 3, ease: 'power3.out' }
    )
    .to(logoRef.current.position, {
      z: 15, // Pushes logo past the camera
      duration: 2,
      ease: 'power2.inOut',
      delay: 2
    });
  }, []);

  useFrame((state) => {
    // Liquid ripple effect
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={logoRef}>
      <Text
        fontSize={3}
        font="/fonts/BMWTypeNext-Bold.woff" // Use brand appropriate font
        position={[0, 0, 0]}
      >
        BMW
        <MeshTransmissionMaterial 
          thickness={1.5} 
          roughness={0} 
          transmission={1} 
          ior={1.5} 
          chromaticAberration={0.04} 
          distortion={0.5} 
          distortionScale={0.3} 
          clearcoat={1}
        />
      </Text>
    </group>
  );
}

