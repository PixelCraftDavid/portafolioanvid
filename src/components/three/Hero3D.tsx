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
import { useIsMobile } from "@/hooks/useMediaQuery";

function getCSSVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function Blob() {
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const [colors, setColors] = useState({
    nodeColor: "#a855f7",
    lineColor: "#7c3aed",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setColors({
        nodeColor: getCSSVar("--blob-emissive", "#a855f7"),
        lineColor: getCSSVar("--blob-color", "#7c3aed"),
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotación lenta del grupo
    groupRef.current.rotation.y += 0.0015;
    groupRef.current.rotation.x += 0.0005;

    // Reacción suave al mouse (todo el grupo se desplaza)
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      (state.mouse.x * state.viewport.width) / 25,
      0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      (state.mouse.y * state.viewport.height) / 25,
      0.05
    );
  });

  // Número de nodos según dispositivo
  const NODE_COUNT = isMobile ? 25 : 45;
  // Distancia máxima para conectar dos nodos con una línea
  const MAX_CONNECTION_DISTANCE = 2.2;

  // Generar nodos aleatorios en una esfera
  const nodes = useRef<THREE.Vector3[]>(
    Array.from({ length: NODE_COUNT }, () => {
      const r = 3; // radio de la esfera contenedora
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      // Distribuir con algo de ruido para que no sea perfecto
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    })
  ).current;

  // Precalcular qué pares de nodos están conectados (para no hacerlo en cada frame)
  const connections = useRef<[number, number][]>([]);
  useEffect(() => {
    const list: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < MAX_CONNECTION_DISTANCE) {
          list.push([i, j]);
        }
      }
    }
    connections.current = list;
  }, [nodes]);

  // Crear geometría de líneas
  const lineGeometry = useRef<THREE.BufferGeometry | null>(null);
  useEffect(() => {
    const positions = new Float32Array(connections.current.length * 6);
    connections.current.forEach(([a, b], idx) => {
      positions[idx * 6 + 0] = nodes[a].x;
      positions[idx * 6 + 1] = nodes[a].y;
      positions[idx * 6 + 2] = nodes[a].z;
      positions[idx * 6 + 3] = nodes[b].x;
      positions[idx * 6 + 4] = nodes[b].y;
      positions[idx * 6 + 5] = nodes[b].z;
    });
    lineGeometry.current = new THREE.BufferGeometry();
    lineGeometry.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }, [nodes]);

  // Posiciones de los nodos para el <points>
  const nodePositions = useRef(
    new Float32Array(nodes.flatMap((n) => [n.x, n.y, n.z]))
  ).current;

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} scale={1.2}>
        {/* Líneas de conexión */}
        {lineGeometry.current && (
          <lineSegments geometry={lineGeometry.current}>
            <lineBasicMaterial
              color={colors.lineColor}
              transparent
              opacity={0.35}
            />
          </lineSegments>
        )}

        {/* Nodos (puntos) */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.12}
            color={colors.nodeColor}
            transparent
            opacity={1}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Esferas pequeñas visibles en cada nodo (opcional, más "3D") */}
        {nodes.map((node, i) => (
          <mesh key={i} position={node}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              color={colors.nodeColor}
              emissive={colors.nodeColor}
              emissiveIntensity={2}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
function Particles({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const actualCount = isMobile ? 150 : count;

  const [color, setColor] = useState("#a855f7");

  useEffect(() => {
    const timer = setTimeout(() => {
      setColor(getCSSVar("--particles-color", "#a855f7"));
    }, 50);
    return () => clearTimeout(timer);
  }, [theme]);

  const positions = useRef(
    (() => {
      const arr = new Float32Array(actualCount * 3);
      for (let i = 0; i < actualCount; i++) {
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
      <ambientLight intensity={theme === "light" ? 0.7 : 0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={theme === "light" ? 1.8 : 1.5}
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
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <Blob />
          <Particles />
          <Environment preset={theme === "light" ? "sunset" : "city"} />

          {!isMobile && (
            <EffectComposer>
              <Bloom
                intensity={theme === "light" ? 0.6 : 0.9}
                luminanceThreshold={theme === "light" ? 0.4 : 0.2}
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
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}