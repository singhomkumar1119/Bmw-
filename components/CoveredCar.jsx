// components/CoveredCar.jsx
import { useRef, useState } from 'react';
import { useGLTF, MeshPhysicalMaterial } from '@react-three/drei';
import gsap from 'gsap';

export default function CoveredCar({ modelPath, position }) {
  const { nodes, materials } = useGLTF(modelPath);
  const clothRef = useRef();
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    // Assuming the cloth mesh has a morphTarget named "Reveal"
    gsap.to(clothRef.current.morphTargetInfluences, {
      [nodes.Cloth.morphTargetDictionary["Reveal"]]: 1,
      duration: 2.5,
      ease: 'power3.inOut'
    });

    // Fade out cloth opacity slightly at the end
    gsap.to(materials.SilkCloth, {
      opacity: 0,
      transparent: true,
      duration: 1,
      delay: 1.5
    });
  };

  return (
    <group position={position} onClick={handleReveal}>
      {/* The Car */}
      <mesh geometry={nodes.BMW_Body.geometry}>
        <meshPhysicalMaterial 
          color="#111111" 
          metalness={0.9} 
          roughness={0.1} 
          clearcoat={1} 
          clearcoatRoughness={0.05} 
        />
      </mesh>
      
      {/* The Cloth */}
      <mesh 
        ref={clothRef}
        geometry={nodes.Cloth.geometry} 
        material={materials.SilkCloth}
        morphTargetDictionary={nodes.Cloth.morphTargetDictionary}
        morphTargetInfluences={nodes.Cloth.morphTargetInfluences}
      >
        <meshStandardMaterial 
          color="#222222" 
          roughness={0.6} 
          metalness={0.1} 
          side={2} // DoubleSide for cloth
        />
      </mesh>
    </group>
  );
}

