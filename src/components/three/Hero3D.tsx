"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/theme/ThemeProvider";

function getCSSVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const [colors, setColors] = useState({
    color: "#7c3aed",
    emissive: "#a855f7",
  });

  useEffect(() => {
    // Esperar un tick para que el CSS ya esté aplicado
    const timer = setTimeout(() => {
      setColors({
        color: getCSSVar("--blob-color", "#7c3aed"),
        emissive: getCSSVar("--blob-emissive", "#a855f7"),
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.z += 0.001;

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
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color={colors.color}
          emissive={colors.emissive}
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.85}
          distort={0.5}
          speed={2.5}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const [color, setColor] = useState("#a855f7");

  useEffect(() => {
    const timer = setTimeout(() => {
      setColor(getCSSVar("--particles-color", "#a855f7"));
    }, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  const positions = useRef(
    (() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
      return arr;
    })()
  ).current;

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
    pointsRef.current.rotation.x += 0.0004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Lights() {
  const { theme } = useTheme();
  const [colors, setColors] = useState({
    light: "#a855f7",
    lightSecondary: "#22d3ee",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setColors({
        light: getCSSVar("--blob-light", "#a855f7"),
        lightSecondary: getCSSVar("--blob-light-secondary", "#22d3ee"),
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.8 : 0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={theme === "light" ? 2 : 1.5}
      />
      <pointLight position={[-5, -5, -5]} color={colors.light} intensity={3} />
      <pointLight
        position={[5, -5, 5]}
        color={colors.lightSecondary}
        intensity={theme === "light" ? 2.5 : 2}
      />
    </>
  );
}

export default function Hero3D() {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Blob />
          <Particles />
          <Environment preset={theme === "light" ? "sunset" : "city"} />

          <EffectComposer>
            <Bloom
              intensity={theme === "light" ? 0.5 : 0.9}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0005] as any}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}