"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("inariño_cookies_accepted")) {
      // Small delay so it doesn't flash on initial load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("inariño_cookies_accepted", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[70] rounded-2xl border px-5 py-4 flex flex-col gap-3"
          style={{
            background: "var(--surface)",
            borderColor: "rgba(255,255,255,0.09)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          <p className="text-sm text-zinc-300 leading-relaxed">
            Usamos cookies para mejorar tu experiencia. Al continuar aceptas nuestra{" "}
            <Link href="/privacidad" className="text-[#E3000B] underline underline-offset-2">
              política de privacidad
            </Link>{" "}
            (Ley 1581/2012).
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 btn-primary py-2 text-sm justify-center"
            >
              Aceptar
            </button>
            <button
              onClick={accept}
              className="flex-1 py-2 rounded-xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              Rechazar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
