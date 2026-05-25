"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ApparelModelProps {
  productId: string;
  activeColorHex: string;
}

export const ApparelModel: React.FC<ApparelModelProps> = ({
  productId,
  activeColorHex,
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const colorMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Smoothly interpolate material color
  const targetColor = React.useMemo(() => new THREE.Color(activeColorHex), [activeColorHex]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (modelRef.current) {
      // Auto-rotation
      modelRef.current.rotation.y = time * 0.25;
      
      // Dynamic vertical floating motion
      modelRef.current.position.y = Math.sin(time * 1.5) * 0.1;
    }

    if (colorMaterialRef.current) {
      colorMaterialRef.current.color.lerp(targetColor, 0.08);
    }
  });

  // Render procedural models depending on the active product ID
  const renderGeometry = () => {
    switch (productId) {
      case "nebula-runner":
        // Futuristic Carbon-Plate Running Shoe
        return (
          <group position={[0, -0.4, 0]} scale={[1.1, 1.1, 1.1]}>
            {/* Curved Carbon Plate Sole */}
            <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, 0.15, 0.55]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Glowing Interactive Midsole Cushion */}
            <mesh position={[0, -0.02, 0]}>
              <boxGeometry args={[1.52, 0.12, 0.53]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
            </mesh>

            {/* High-Tensile Matrix Upper Mesh */}
            <mesh position={[0.1, 0.2, 0]} castShadow>
              <sphereGeometry args={[0.34, 32, 16]} />
              <meshStandardMaterial
                ref={colorMaterialRef}
                color={activeColorHex}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>
            <mesh position={[-0.3, 0.1, 0]} castShadow>
              <sphereGeometry args={[0.26, 32, 16]} />
              <meshStandardMaterial
                ref={colorMaterialRef}
                color={activeColorHex}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* Futuristic Ankle Sock Collar */}
            <mesh position={[-0.1, 0.38, 0]} rotation={[0, 0, -0.2]}>
              <cylinderGeometry args={[0.2, 0.22, 0.3, 16]} />
              <meshStandardMaterial color="#18181b" roughness={0.5} />
            </mesh>

            {/* Dynamic Energy Accent Line */}
            <mesh position={[0.2, 0.15, 0.26]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.7, 0.04, 0.02]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        );

      case "chronos-joggers":
      case "quantum-tights":
        // Cybernetic Leg Trousers / Tights
        return (
          <group position={[0, -0.6, 0]} scale={[0.8, 0.8, 0.8]}>
            {/* Waistband Connect */}
            <mesh position={[0, 1.1, 0]} castShadow>
              <torusGeometry args={[0.42, 0.08, 16, 32]} />
              <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Left Leg sleeve */}
            <mesh position={[-0.22, 0.3, 0]} rotation={[0, 0, 0.08]} castShadow>
              <cylinderGeometry args={[0.18, 0.11, 1.4, 32]} />
              <meshStandardMaterial
                ref={colorMaterialRef}
                color={activeColorHex}
                roughness={0.35}
                metalness={0.3}
              />
            </mesh>

            {/* Right Leg sleeve */}
            <mesh position={[0.22, 0.3, 0]} rotation={[0, 0, -0.08]} castShadow>
              <cylinderGeometry args={[0.18, 0.11, 1.4, 32]} />
              <meshStandardMaterial
                ref={colorMaterialRef}
                color={activeColorHex}
                roughness={0.35}
                metalness={0.3}
              />
            </mesh>

            {/* Kinetic Knee articulation rings */}
            <mesh position={[-0.25, 0.3, 0.02]}>
              <ringGeometry args={[0.16, 0.19, 16]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.25, 0.3, 0.02]}>
              <ringGeometry args={[0.16, 0.19, 16]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>
          </group>
        );

      case "nebula-jacket":
      case "quantum-anorak":
        // Cinematic High-End Jacket Outer Shell
        return (
          <group position={[0, -0.4, 0]}>
            {/* Solid Muscular Core */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.35, 0.9, 32]} />
              <meshStandardMaterial
                ref={colorMaterialRef}
                color={activeColorHex}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* Heavy-Layer Hood Overlay */}
            <mesh position={[0, 1.05, -0.05]} castShadow>
              <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
              <meshStandardMaterial color="#1e1e24" roughness={0.5} />
            </mesh>

            {/* Left Utility Shoulder Armor */}
            <mesh position={[-0.64, 0.75, 0]} rotation={[0, 0, 0.3]} castShadow>
              <cylinderGeometry args={[0.22, 0.18, 0.4, 16]} />
              <meshStandardMaterial color="#09090b" metalness={0.85} roughness={0.15} />
            </mesh>

            {/* Right Utility Shoulder Armor */}
            <mesh position={[0.64, 0.75, 0]} rotation={[0, 0, -0.3]} castShadow>
              <cylinderGeometry args={[0.22, 0.18, 0.4, 16]} />
              <meshStandardMaterial color="#09090b" metalness={0.85} roughness={0.15} />
            </mesh>

            {/* Central Asymmetric Magnet Zipper Seam */}
            <mesh position={[0.04, 0.4, 0.51]}>
              <boxGeometry args={[0.02, 0.8, 0.02]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        );

      default:
        // Aether Top & general sportswear shirts
        return (
          <group position={[0, -0.4, 0]}>
            {/* Torso core */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.32, 0.8, 32]} />
              <meshStandardMaterial
                ref={colorMaterialRef}
                color={activeColorHex}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>

            {/* Shoulder caps */}
            <mesh position={[-0.56, 0.72, 0]} castShadow>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#09090b" metalness={0.7} roughness={0.2} />
            </mesh>
            <mesh position={[0.56, 0.72, 0]} castShadow>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#09090b" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Glowing Brand Line insignia */}
            <mesh position={[0, 0.55, 0.46]} rotation={[0, 0, Math.PI / 4]}>
              <ringGeometry args={[0.06, 0.08, 4]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group ref={modelRef}>
      {/* Dynamic lighting rig inside the isolated details scene */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} castShadow color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={1.8} color="#ffffff" />
      <pointLight position={[3, 2, -3]} intensity={1.2} color="#a5b1c2" />

      {renderGeometry()}

      {/* R3F orbital dragging control overlay */}
      <OrbitControls
        enableZoom={true}
        minDistance={1.8}
        maxDistance={4.2}
        enablePan={false}
        autoRotate={false}
      />
    </group>
  );
};
export default ApparelModel;
