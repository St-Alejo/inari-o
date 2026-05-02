"use client";

import { useState } from "react";
import { useVoiceAgent } from "@/hooks/useVoiceAgent";
import CallModal from "./CallModal";

export default function VoiceAgentButton() {
  const [open, setOpen] = useState(false);
  const { state, transcript, aiResponse, isMuted, startCall, endCall, toggleMute } =
    useVoiceAgent();

  const handleOpen = () => {
    setOpen(true);
    startCall();
  };

  const handleEnd = () => {
    endCall();
    setTimeout(() => setOpen(false), 800);
  };

  const isActive = state !== "idle" && state !== "ended" && state !== "unsupported";

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-24 right-6 sm:bottom-6 sm:right-24 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{
          background: isActive ? "#059669" : "var(--surface)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
        aria-label="Llamar al asesor virtual"
        title="Asesor de voz"
      >
        {/* Pulsing ring when active */}
        {isActive && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              animation: "pulse-ring 1.5s ease-out infinite",
              background: "rgba(5,150,105,0.4)",
            }}
          />
        )}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <style>{`@keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }`}</style>
      </button>

      <CallModal
        isOpen={open}
        state={state}
        transcript={transcript}
        aiResponse={aiResponse}
        isMuted={isMuted}
        onEnd={handleEnd}
        onMute={toggleMute}
      />
    </>
  );
}
