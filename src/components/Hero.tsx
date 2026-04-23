"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sphere, RoundedBox } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function IPhoneModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += (mouseX * 0.7 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-mouseY * 0.35 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.position.y = Math.sin(t * 0.55) * 0.07;
  });

  return (
    <group ref={groupRef} scale={1.25}>
      {/* Body */}
      <RoundedBox args={[1.05, 2.25, 0.11]} radius={0.095} smoothness={8}>
        <meshStandardMaterial color="#0d0d0d" metalness={0.97} roughness={0.03} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.058]}>
        <planeGeometry args={[0.9, 1.98]} />
        <meshStandardMaterial color="#060606" emissive="#E3000B" emissiveIntensity={0.06} />
      </mesh>

      {/* Screen highlight — thin red bar at top */}
      <mesh position={[0, 0.7, 0.059]}>
        <planeGeometry args={[0.6, 0.025]} />
        <meshStandardMaterial color="#E3000B" emissive="#E3000B" emissiveIntensity={3} />
      </mesh>

      {/* iNariño wordmark area */}
      <mesh position={[0, 0.05, 0.059]}>
        <planeGeometry args={[0.42, 0.1]} />
        <meshStandardMaterial color="#E3000B" emissive="#E3000B" emissiveIntensity={2} />
      </mesh>

      {/* Dynamic Island */}
      <mesh position={[0, 0.98, 0.059]}>
        <capsuleGeometry args={[0.065, 0.18, 8, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Camera module */}
      <RoundedBox args={[0.36, 0.36, 0.042]} radius={0.055} position={[-0.2, 0.8, -0.076]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.92} roughness={0.08} />
      </RoundedBox>
      <Sphere args={[0.065, 16, 16]} position={[-0.24, 0.86, -0.083]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.08} />
      </Sphere>
      <Sphere args={[0.065, 16, 16]} position={[-0.13, 0.86, -0.083]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.08} />
      </Sphere>
      <Sphere args={[0.065, 16, 16]} position={[-0.185, 0.74, -0.083]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.08} />
      </Sphere>

      {/* Side buttons */}
      <RoundedBox args={[0.038, 0.2, 0.038]} radius={0.01} position={[0.555, 0.17, 0]}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.92} roughness={0.08} />
      </RoundedBox>
      <RoundedBox args={[0.038, 0.13, 0.038]} radius={0.01} position={[-0.555, 0.28, 0]}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.92} roughness={0.08} />
      </RoundedBox>
      <RoundedBox args={[0.038, 0.13, 0.038]} radius={0.01} position={[-0.555, 0.09, 0]}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.92} roughness={0.08} />
      </RoundedBox>
    </group>
  );
}

function Particles() {
  const count = 100;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const meshRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#E3000B" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[4, 4, 4]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={2} color="#E3000B" />
      <spotLight position={[0, 7, 4]} angle={0.35} penumbra={0.9} intensity={4} color="#ffffff" castShadow />
      <Environment preset="city" />
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
        <IPhoneModel mouseX={mouseX} mouseY={mouseY} />
      </Float>
      <Particles />
    </>
  );
}

export default function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 });

  return (
    <div
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--black)" }}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 1.2;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
      }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: "radial-gradient(ellipse 55% 65% at 68% 50%, rgba(227,0,11,0.14) 0%, transparent 68%)",
        }}
      />
      {/* Horizontal divider line — top */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(227,0,11,0.35), transparent)" }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 43 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene mouseX={mouseRef.current.x} mouseY={mouseRef.current.y} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content — left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col justify-center h-full pt-24 pb-16 pointer-events-none">
        <div className="max-w-lg">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pill-label mb-7"
          >
            Nariño, Colombia
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold leading-[1.0] text-white mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(3.2rem, 7vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            El futuro
            <br />
            <span style={{ color: "#E3000B" }}>en tus</span>
            <br />
            manos.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-zinc-500 text-base leading-relaxed mb-10 max-w-sm"
          >
            Distribuidor autorizado de productos Apple en Nariño. Originales. Sellados. Con garantía.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-3 flex-wrap pointer-events-auto"
          >
            <a href="#iphones" className="btn-primary">
              Explorar Tienda
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#featured" className="btn-outline">
              Conocer más
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-10 mt-16 pt-8 pointer-events-none"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { num: "500+", label: "clientes" },
              { num: "100%", label: "originales" },
              { num: "24h", label: "entrega" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white font-bold text-2xl" style={{ fontFamily: "'Syne', sans-serif" }}>{s.num}</p>
                <p className="text-zinc-600 text-xs mt-0.5 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #E3000B, transparent)" }}
        />
        <span className="text-[10px] tracking-[0.22em] text-zinc-700 uppercase">Scroll</span>
      </motion.div>
    </div>
  );
}
