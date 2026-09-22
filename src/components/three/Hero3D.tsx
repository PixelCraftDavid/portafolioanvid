"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotación continua suave
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;

    // Reacción suave al mouse
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (state.mouse.x * state.viewport.width) / 15,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (state.mouse.y * state.viewport.height) / 15,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          distort={0.45}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={2} />

          <Blob />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}