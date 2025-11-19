"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  OrbitControls,
  Torus,
  Box,
  Octahedron
} from "@react-three/drei";
import * as THREE from "three";

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} position={position} args={[1, 1, 1]}>
        <MeshDistortMaterial
          color="#818cf8"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </Box>
    </Float>
  );
}

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <Torus ref={meshRef} position={position} args={[1, 0.3, 16, 32]}>
        <MeshDistortMaterial
          color="#a78bfa"
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
}

function FloatingOctahedron({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={2} floatIntensity={1.8}>
      <Octahedron ref={meshRef} position={position} args={[1]}>
        <MeshDistortMaterial
          color="#2dd4bf"
          attach="material"
          distort={0.4}
          speed={1.8}
          roughness={0.3}
          metalness={0.85}
        />
      </Octahedron>
    </Float>
  );
}

function MainSphere() {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1.5, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

export function CryptoScene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#818cf8" intensity={0.5} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          color="#a78bfa"
        />

        <MainSphere />
        <FloatingCube position={[3, 1, 0]} />
        <FloatingCube position={[-3, -1, 0]} />
        <FloatingTorus position={[2, -2, -1]} />
        <FloatingTorus position={[-2, 2, -1]} />
        <FloatingOctahedron position={[0, 2.5, -2]} />
        <FloatingOctahedron position={[0, -2.5, -2]} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
