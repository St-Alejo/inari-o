"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "inariño_splash_seen_v1";

export default function SplashGate() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem(STORAGE_KEY) === "1";
    if (!seen && !reduced) {
      setVisible(true);
      const t = setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setVisible(false);
      }, 1100);
      return () => clearTimeout(t);
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080808]"
          aria-hidden="true"
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(227,0,11,0.35) 0%, rgba(0,0,0,0) 60%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <span
                className="text-6xl md:text-7xl font-bold tracking-tighter"
                style={{ fontFamily: "'Syne', sans-serif", color: "#E3000B" }}
              >
                Inn
              </span>
              <span
                className="text-6xl md:text-7xl font-bold tracking-tighter text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                arino
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="ml-2 mb-3 w-2 h-2 rounded-full"
                style={{ background: "#E3000B" }}
              />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] w-40 origin-left"
              style={{ background: "#E3000B" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-[10px] tracking-[0.4em] uppercase text-zinc-500"
            >
              Apple · Pasto · Nariño
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
