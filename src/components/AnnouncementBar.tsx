"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "inariño_announcement_dismissed_v1";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const formatted = siteConfig.freeShippingThreshold.toLocaleString("es-CO");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          className="fixed top-20 left-1/2 z-30 -translate-x-1/2 pointer-events-auto"
          style={{ maxWidth: "calc(100vw - 2rem)" }}
          role="region"
          aria-label="Anuncio"
        >
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-full text-[11px] font-medium tracking-wide shadow-2xl"
            style={{
              background: "rgba(16,16,16,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3000B] animate-pulse flex-shrink-0" />
            <span className="text-zinc-300">
              Envío gratis en compras sobre{" "}
              <span className="text-white font-semibold">${formatted}</span>
              {" "}· Garantía oficial Apple
            </span>
            <button
              onClick={close}
              aria-label="Cerrar anuncio"
              className="ml-1 text-zinc-500 hover:text-white transition-colors flex-shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
