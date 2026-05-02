"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "inariño_guide_seen_v1";

const STEPS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Explora el catálogo",
    body: "Aquí encuentras todos nuestros equipos Apple. Usa los filtros de la izquierda para buscar por precio, modelo o condición.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Compara productos",
    body: "Selecciona hasta 3 equipos con el botón \"Comparar\" y ve sus especificaciones lado a lado para elegir el ideal.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Tu asesor siempre listo",
    body: "¿Tienes dudas? El botón rojo abajo a la derecha abre tu asesor IA. Cuéntale lo que buscas y él te recomienda.",
  },
];

export default function StoreGuide() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  const current = STEPS[step];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="guide-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[150] pointer-events-none flex items-end justify-end"
          aria-live="polite"
        >
          {/* Subtle backdrop */}
          <motion.div
            className="absolute inset-0 pointer-events-auto"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: "rgba(0,0,0,0.45)" }}
          />

          {/* Mascot + bubble */}
          <div className="relative mb-44 sm:mb-28 mr-4 sm:mr-6 md:mr-10 pointer-events-auto flex flex-col items-end gap-3">
            {/* Speech bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
                className="max-w-[280px] rounded-2xl p-4 shadow-2xl"
                style={{
                  background: "rgba(18,18,18,0.97)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Step dots */}
                <div className="flex gap-1.5 mb-3">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === step ? "18px" : "6px",
                        background: i === step ? "#E3000B" : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>

                {/* Icon + title */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[#E3000B]">{current.icon}</span>
                  <span className="text-white text-sm font-semibold leading-tight">
                    {current.title}
                  </span>
                </div>

                {/* Body */}
                <p className="text-zinc-400 text-xs leading-relaxed mb-4">{current.body}</p>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={dismiss}
                    className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    Omitir tour
                  </button>
                  <button
                    onClick={next}
                    className="flex items-center gap-1.5 text-xs font-medium text-white px-3.5 py-1.5 rounded-full transition-all"
                    style={{ background: "#E3000B" }}
                  >
                    {step < STEPS.length - 1 ? (
                      <>
                        Siguiente
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </>
                    ) : (
                      "¡Entendido!"
                    )}
                  </button>
                </div>

                {/* Bubble tail pointing down-right */}
                <div
                  className="absolute -bottom-2.5 right-8 w-4 h-4 rotate-45"
                  style={{
                    background: "rgba(18,18,18,0.97)",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Mascot face */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl select-none"
              style={{
                background: "linear-gradient(135deg, #E3000B 0%, #9a0008 100%)",
                border: "3px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Simple smiley face */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                {/* Eyes */}
                <circle cx="12" cy="13" r="2" fill="white" />
                <circle cx="20" cy="13" r="2" fill="white" />
                {/* Pupils */}
                <circle cx="12.8" cy="13.8" r="1" fill="#9a0008" />
                <circle cx="20.8" cy="13.8" r="1" fill="#9a0008" />
                {/* Smile */}
                <path d="M10 19 Q16 24 22 19" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
