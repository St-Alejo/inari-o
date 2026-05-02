"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { VoiceState } from "@/hooks/useVoiceAgent";
import { siteConfig } from "@/lib/site-config";

const STATE_LABELS: Record<VoiceState, string> = {
  idle: "Listo",
  connecting: "Conectando…",
  listening: "Escuchando…",
  thinking: "Procesando…",
  speaking: "Respondiendo…",
  ended: "Llamada finalizada",
  unsupported: "No disponible",
};

function Waveform({ active }: { active: boolean }) {
  const bars = [4, 7, 5, 9, 6, 8, 4, 7, 5];
  return (
    <div className="flex items-center gap-[3px] h-10">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-[#E3000B]"
          style={{
            height: active ? `${h * 4}px` : "4px",
            transition: "height 0.15s ease",
            animation: active ? `wavebar 0.8s ease-in-out ${i * 0.08}s infinite alternate` : "none",
          }}
        />
      ))}
      <style>{`@keyframes wavebar { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }`}</style>
    </div>
  );
}

type Props = {
  isOpen: boolean;
  state: VoiceState;
  transcript: string;
  aiResponse: string;
  isMuted: boolean;
  onEnd: () => void;
  onMute: () => void;
};

export default function CallModal({
  isOpen,
  state,
  transcript,
  aiResponse,
  isMuted,
  onEnd,
  onMute,
}: Props) {
  const prevAiResponse = useRef(aiResponse);
  useEffect(() => {
    prevAiResponse.current = aiResponse;
  }, [aiResponse]);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola Inariño, me comuniqué con el agente de voz y quisiera hablar con un asesor.")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ y: 60, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 60, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="w-full max-w-sm rounded-3xl overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="w-16 h-16 rounded-full bg-[#E3000B]/15 border border-[#E3000B]/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-[#E3000B]" style={{ fontFamily: "'Syne', sans-serif" }}>I</span>
              </div>
              <p className="font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Asesor Inariño</p>
              <p className="text-xs text-emerald-400 mt-0.5">● {STATE_LABELS[state]}</p>
            </div>

            {/* Waveform + transcript */}
            <div className="px-6 py-6 flex flex-col items-center gap-4 min-h-[140px]">
              <Waveform active={state === "speaking"} />

              {transcript && (
                <div className="w-full rounded-xl px-3 py-2 text-sm text-zinc-300 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <span className="text-zinc-500 text-[10px] block mb-1">Usted dijo</span>
                  {transcript}
                </div>
              )}

              {aiResponse && (
                <div className="w-full rounded-xl px-3 py-2 text-sm text-white text-center" style={{ background: "rgba(227,0,11,0.08)", border: "1px solid rgba(227,0,11,0.15)" }}>
                  {aiResponse}
                </div>
              )}

              {state === "unsupported" && (
                <p className="text-xs text-amber-400 text-center">
                  Su navegador no soporta reconocimiento de voz.<br />
                  Por favor use Chrome o Edge.
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="px-6 pb-6 flex flex-col gap-3">
              <div className="flex gap-3 justify-center">
                {/* Mute */}
                <button
                  onClick={onMute}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: isMuted ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  title={isMuted ? "Activar audio" : "Silenciar"}
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                {/* End call */}
                <button
                  onClick={onEnd}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{ background: "#E3000B" }}
                  title="Finalizar llamada"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73 1.6 0 3.15.25 4.6.72v3.1c0 .4.23.74.56.9.98.49 1.87 1.12 2.66 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z" />
                  </svg>
                </button>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                  title="Pasar a WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>

              <p className="text-[10px] text-zinc-600 text-center">
                {state === "listening" ? "Hable ahora…" : state === "thinking" ? "Consultando el catálogo…" : ""}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
