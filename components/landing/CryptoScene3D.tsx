"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Float,
  OrbitControls,
  Torus,
  Octahedron,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  shape = "torus"
}: {
  position: [number, number, number];
  color: string;
  shape?: "torus" | "box" | "octahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const ShapeComponent = shape === "torus" ? Torus : shape === "box" ? Box : Octahedron;
  const shapeArgs = shape === "torus" ? [0.6, 0.2, 16, 32] : shape === "box" ? [0.8, 0.8, 0.8] : [0.7];

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <ShapeComponent ref={meshRef} position={position} args={shapeArgs as any}>
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </ShapeComponent>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} color="#a78bfa" intensity={0.5} />

      {/* Simple geometric shapes */}
      <FloatingShape position={[-2, 1, 0]} color="#a78bfa" shape="box" />
      <FloatingShape position={[2, -1, 0]} color="#2dd4bf" shape="octahedron" />
      <FloatingShape position={[0, 0, -2]} color="#f472b6" shape="torus" />
      <FloatingShape position={[-1.5, -1.5, -1]} color="#818cf8" shape="box" />
      <FloatingShape position={[1.5, 1.5, -1]} color="#fb923c" shape="octahedron" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export function CryptoScene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="transition-opacity duration-1000 ease-in-out"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
