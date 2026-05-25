"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import * as THREE from "three";

// Custom GPU-efficient Starfield / Space Particle System
const SpaceParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create 1200 random coordinates for star points
  const [positions, scales] = useMemo(() => {
    const count = 1200;
    const positionsArr = new Float32Array(count * 3);
    const scalesArr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a large sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 10 + Math.random() * 40; // radius between 10 and 50

      positionsArr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positionsArr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positionsArr[i * 3 + 2] = r * Math.cos(phi);

      scalesArr[i] = Math.random() * 0.15 + 0.05;
    }
    return [positionsArr, scalesArr];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow cinematic drift rotation
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;

    // Subtle scale pulsing
    const scaleAttr = pointsRef.current.geometry.attributes.scale as THREE.BufferAttribute;
    if (scaleAttr) {
      for (let i = 0; i < scales.length; i++) {
        scaleAttr.setY(i, scales[i] * (1 + Math.sin(time * 2 + i) * 0.2));
      }
      scaleAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Light rig that reacts subtly to mouse positions
const MouseReactiveLights: React.FC = () => {
  const { mouse } = useThree();
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (spotlightRef.current) {
      // Interpolate spotlight position towards mouse coordinates
      spotlightRef.current.position.x = THREE.MathUtils.lerp(
        spotlightRef.current.position.x,
        mouse.x * 6,
        0.05
      );
      spotlightRef.current.position.y = THREE.MathUtils.lerp(
        spotlightRef.current.position.y,
        mouse.y * 6,
        0.05
      );
    }

    if (pointLightRef.current) {
      // Interactive backlights drift
      pointLightRef.current.position.x = THREE.MathUtils.lerp(
        pointLightRef.current.position.x,
        -mouse.x * 4,
        0.05
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Dynamic Key Spotlight */}
      <spotLight
        ref={spotlightRef}
        position={[0, 0, 8]}
        angle={0.4}
        penumbra={0.8}
        intensity={2.5}
        color="#ffffff"
        castShadow
      />

      {/* Futuristic soft cyan-silver backlights */}
      <pointLight
        ref={pointLightRef}
        position={[-6, 4, -4]}
        intensity={2}
        color="#c8d6e5"
      />
      <pointLight
        position={[6, -4, -4]}
        intensity={1.5}
        color="#a5b1c2"
      />
    </>
  );
};

interface SpaceSceneProps {
  children?: React.ReactNode;
  cameraZ?: number;
}

export const SpaceScene: React.FC<SpaceSceneProps> = ({ children, cameraZ = 5.5 }) => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={45} />
        
        {/* Cinematic height fog */}
        <fogExp2 attach="fog" args={["#030305", 0.015]} />

        {/* Space backdrop dust */}
        <SpaceParticles />

        {/* Cinematic illumination */}
        <MouseReactiveLights />

        {/* Render child elements (the 3D models) */}
        {children}

        <Preload all />
      </Canvas>
    </div>
  );
};
export default SpaceScene;
