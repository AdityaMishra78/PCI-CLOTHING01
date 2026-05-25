"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AthleticModelProps {
  activeColorHex?: string; // Hex color for the sportswear t-shirt
}

export const AthleticModel: React.FC<AthleticModelProps> = ({
  activeColorHex = "#050505", // Default Stealth Black
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Mesh>(null);
  const shirtMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { mouse } = useThree();

  // Handle color transitions smoothly
  const targetColor = React.useMemo(() => new THREE.Color(activeColorHex), [activeColorHex]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // 1. Breathing Animation (Scale and Y-offset)
      const breathScale = 1 + Math.sin(time * 1.8) * 0.012;
      const breathY = Math.sin(time * 1.8) * 0.02;
      groupRef.current.scale.set(breathScale, breathScale, breathScale);
      
      // 2. Slow automatic rotation + Mouse tracking tilt
      const targetRotY = (mouse.x * 0.45) + (time * 0.15); // Auto rotate + follow mouse x
      const targetRotX = (-mouse.y * 0.25); // Follow mouse y
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1.2 + breathY, 0.05);
    }

    // 3. Floating and rotating glowing PCI chest emblem
    if (logoRef.current) {
      logoRef.current.rotation.z = -time * 0.8;
      logoRef.current.position.z = 0.65 + Math.sin(time * 3) * 0.015; // Hovering pulse
    }

    // 4. Smooth material color interpolation
    if (shirtMaterialRef.current) {
      shirtMaterialRef.current.color.lerp(targetColor, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* 1. Mannequin Torso & Core Anatomy (Sleek Chrome Finish) */}
      
      {/* Hips / Core Base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.45, 0.4, 32]} />
        <meshStandardMaterial
          color="#1e1e24"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Waist Connect (Glowing Energy Spacer) */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>

      {/* Cybernetic Spine Line */}
      <mesh position={[0, 0.9, -0.4]} castShadow>
        <boxGeometry args={[0.08, 0.8, 0.08]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Athletic Torso Muscles (Chrome inner body) */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.45, 0.8, 32]} />
        <meshStandardMaterial
          color="#27272a"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* 2. Overlapping Sportswear T-Shirt Shell */}
      <mesh position={[0, 0.92, 0.01]} castShadow receiveShadow>
        <cylinderGeometry args={[0.77, 0.47, 0.78, 32, 1, true]} />
        <meshStandardMaterial
          ref={shirtMaterialRef}
          color={activeColorHex}
          roughness={0.35}
          metalness={0.3}
          bumpScale={0.015}
        />
      </mesh>

      {/* Broad Shoulders & Chest Plates */}
      {/* Left Shoulder Node */}
      <mesh position={[-0.9, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#18181b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Right Shoulder Node */}
      <mesh position={[0.9, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#18181b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Shoulder Connect Collar Bars */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[1.5, 0.12, 0.22]} />
        <meshStandardMaterial color="#1e1e24" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Neck Cylinder */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.4, 32]} />
        <meshStandardMaterial
          color="#1e1e24"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Stylized Cybernetic Head (Ovoid Chrome Mask) */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#27272a"
          metalness={0.98}
          roughness={0.05}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Neon Scanning Visor Light */}
      <mesh position={[0, 2.0, 0.18]}>
        <boxGeometry args={[0.28, 0.04, 0.15]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      {/* 3. Glowing Metallic PCI Logo Chest Insignia */}
      <group position={[0, 1.05, 0]}>
        {/* Holographic Glowing Base Ring */}
        <mesh ref={logoRef} castShadow>
          <ringGeometry args={[0.15, 0.18, 32]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
        
        {/* Embossed metallic central point */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.1} />
        </mesh>
      </group>

      {/* Glowing joint connectors to emphasize futuristic build */}
      <mesh position={[-0.8, 1.05, 0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.8, 1.05, 0.1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};
export default AthleticModel;
