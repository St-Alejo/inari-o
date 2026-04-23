"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Cylinder } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

function AppleWatchModel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <RoundedBox args={[1.05, 1.3, 0.2]} radius={0.21} smoothness={12}>
        <meshStandardMaterial color="#0d0d0d" metalness={0.97} roughness={0.03} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.105]}>
        <planeGeometry args={[0.84, 1.06]} />
        <meshStandardMaterial color="#080808" emissive="#E3000B" emissiveIntensity={0.35} />
      </mesh>

      {/* Time display simulation */}
      <mesh position={[0, 0.16, 0.106]}>
        <planeGeometry args={[0.48, 0.16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0, -0.12, 0.106]}>
        <planeGeometry args={[0.34, 0.055]} />
        <meshStandardMaterial color="#E3000B" emissive="#E3000B" emissiveIntensity={1.2} />
      </mesh>

      {/* Digital crown */}
      <Cylinder args={[0.055, 0.055, 0.14, 20]} position={[0.58, 0.19, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.93} roughness={0.07} />
      </Cylinder>

      {/* Side button */}
      <RoundedBox args={[0.11, 0.21, 0.045]} radius={0.02} position={[0.58, -0.08, 0]}>
        <meshStandardMaterial color="#1c1c1e" metalness={0.93} roughness={0.07} />
      </RoundedBox>

      {/* Band top */}
      <RoundedBox args={[0.92, 0.88, 0.14]} radius={0.07} position={[0, 1.08, -0.03]}>
        <meshStandardMaterial color="#E3000B" roughness={0.65} metalness={0.0} />
      </RoundedBox>
      {/* Band bottom */}
      <RoundedBox args={[0.92, 0.88, 0.14]} radius={0.07} position={[0, -1.08, -0.03]}>
        <meshStandardMaterial color="#E3000B" roughness={0.65} metalness={0.0} />
      </RoundedBox>
    </group>
  );
}

function WatchScene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={2.5} color="#E3000B" />
      <spotLight position={[2, 7, 5]} angle={0.32} penumbra={0.85} intensity={5} color="#ffffff" />
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.22}>
        <AppleWatchModel />
      </Float>
    </>
  );
}

const features = [
  { icon: "⚡", text: "Chip S9 — más rápido que nunca" },
  { icon: "☀️", text: "Pantalla 2.000 nits de brillo máximo" },
  { icon: "👆", text: "Nuevo gesto Doble Toque" },
  { icon: "❤️", text: "Monitoreo de salud avanzado" },
];

export default function WatchShowcase() {
  return (
    <section
      id="apple-watch"
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Diagonal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 45% 55% at 25% 50%, rgba(227,0,11,0.12) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── 3D Canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-[480px] w-full"
          >
            <Canvas camera={{ position: [0, 0, 5.2], fov: 40 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                <WatchScene />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <span className="pill-label">Apple Watch Series 9</span>

            <h2
              className="text-white font-bold leading-[1.0]"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.6rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Monitorea
              <br />
              tu <span style={{ color: "#E3000B" }}>vida.</span>
            </h2>

            <p className="text-zinc-500 text-base leading-relaxed max-w-md">
              El Apple Watch más avanzado de la historia. Chip S9, pantalla más brillante y el nuevo gesto Doble Toque.
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-3">
              {features.map((f, i) => (
                <motion.li
                  key={f.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-4 text-zinc-400 text-sm py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-base">{f.icon}</span>
                  {f.text}
                </motion.li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-1">Precio</p>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "#E3000B" }}>
                  $1.899.000 <span className="text-zinc-700 font-normal text-sm">COP</span>
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/product/apple-watch-series-9" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary">
                    Comprar
                  </motion.a>
                </Link>
                <Link href="/product/apple-watch-series-9" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-outline">
                    Detalles
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
