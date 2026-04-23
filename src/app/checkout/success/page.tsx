"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Wompi Transaction ID
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 mt-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
        className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 border border-green-500/30"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-6 text-white"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        ¡Pago exitoso!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-zinc-400 text-lg mb-8"
      >
        Tu pedido ha sido recibido y está siendo procesado. Te enviaremos un correo electrónico con los detalles del envío y el número de seguimiento.
      </motion.p>

      {id && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--surface)] border p-4 rounded-lg mb-10 inline-block text-left"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Referencia Wompi</span>
          <span className="font-mono text-white text-sm">{id}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="bg-[var(--black)] min-h-screen text-white flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-1 flex" style={{ background: "radial-gradient(ellipse at top, rgba(34, 197, 94, 0.05) 0%, transparent 60%)" }}>
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full text-zinc-500">Cargando...</div>}>
          <SuccessContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
