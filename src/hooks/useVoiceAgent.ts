"use client";

import { useCallback, useRef, useState } from "react";
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  getPreferredVoice,
  normalizeTextForTTS,
} from "@/lib/voice/speech-utils";

export type VoiceState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "ended"
  | "unsupported";

type SpeechAlt = { transcript: string; confidence: number };
type SpeechResult = { isFinal: boolean; length: number; [index: number]: SpeechAlt };
type SpeechResultList = { length: number; [index: number]: SpeechResult };
type SpeechRecognitionEvent = { results: SpeechResultList; resultIndex: number };
type SpeechRecognitionErrorEvent = { error: string; message?: string };

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
  }
}

export function useVoiceAgent() {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const historyRef = useRef<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const mountedRef = useRef(true);
  // true while we're waiting for speech input; flipped to false when a result arrives so onend doesn't restart
  const waitingForSpeechRef = useRef(false);

  const stopRecognition = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(
    (text: string, onDone?: () => void) => {
      if (!isSpeechSynthesisSupported() || isMuted) {
        onDone?.();
        return;
      }
      stopSpeech();
      const clean = normalizeTextForTTS(text);
      const utt = new SpeechSynthesisUtterance(clean);
      utt.lang = "es-ES";
      const voice = getPreferredVoice();
      if (voice) utt.voice = voice;
      utt.rate = 1.05;
      utt.pitch = 1;

      // Chrome bug: onend sometimes never fires. Fallback timer based on text length.
      let fired = false;
      const finish = () => {
        if (fired) return;
        fired = true;
        clearTimeout(fallback);
        onDone?.();
      };
      const estimatedMs = Math.max(3500, Math.ceil(clean.length / 12) * 1000 + 1500);
      const fallback = setTimeout(finish, estimatedMs);

      utt.onend = finish;
      utt.onerror = finish;
      utteranceRef.current = utt;
      window.speechSynthesis.speak(utt);
    },
    [isMuted, stopSpeech]
  );

  const startListening = useCallback(() => {
    if (!isSpeechRecognitionSupported() || !mountedRef.current) return;

    // Abort any previous session cleanly
    try { recognitionRef.current?.abort(); } catch { /* ignore */ }

    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const rec = new SR();
    // es-ES is the most widely supported Spanish locale in Chrome's STT service
    rec.lang = "es-ES";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    waitingForSpeechRef.current = true;
    recognitionRef.current = rec;
    setState("listening");

    rec.onresult = async (event: SpeechRecognitionEvent) => {
      waitingForSpeechRef.current = false;
      const said = event.results[0][0].transcript.trim();
      if (!said || !mountedRef.current) return;

      setTranscript(said);
      setState("thinking");
      historyRef.current.push({ role: "user", content: said });

      try {
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyRef.current }),
        });

        if (!mountedRef.current) return;

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          const msg = (err as Record<string, string>).error ?? "No pude procesar su consulta.";
          setAiResponse(msg);
          setState("speaking");
          speak(msg, () => { if (mountedRef.current) startListening(); });
          return;
        }

        const data = (await res.json()) as { response: string };
        const reply = data.response ?? "No tengo respuesta en este momento.";
        historyRef.current.push({ role: "assistant", content: reply });

        if (!mountedRef.current) return;
        setAiResponse(reply);
        setState("speaking");
        speak(reply, () => { if (mountedRef.current) startListening(); });
      } catch {
        if (mountedRef.current) startListening();
      }
    };

    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      waitingForSpeechRef.current = false;
      // Fatal errors — stop the call
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setState("unsupported");
        return;
      }
      // Transient errors (no-speech, network, audio-capture) — retry
      if (mountedRef.current) {
        setTimeout(() => startListening(), 600);
      }
    };

    rec.onend = () => {
      // Fires after onresult too; only restart when no result was captured (silence timeout)
      if (mountedRef.current && waitingForSpeechRef.current) {
        waitingForSpeechRef.current = false;
        setTimeout(() => startListening(), 300);
      }
    };

    try {
      rec.start();
    } catch {
      // InvalidStateError if already started — ignore
    }
  }, [speak]);

  const startCall = useCallback(async () => {
    if (!isSpeechRecognitionSupported()) {
      setState("unsupported");
      return;
    }
    mountedRef.current = true;
    waitingForSpeechRef.current = false;
    historyRef.current = [];
    setState("connecting");

    // Request mic permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setState("unsupported");
      return;
    }

    // Greet the user
    const greeting = "Hola, soy el asesor virtual de Inariño. ¿En qué le puedo ayudar?";
    setAiResponse(greeting);
    historyRef.current.push({ role: "assistant", content: greeting });
    setState("speaking");

    speak(greeting, () => {
      if (mountedRef.current) startListening();
    });
  }, [speak, startListening]);

  const endCall = useCallback(() => {
    mountedRef.current = false;
    waitingForSpeechRef.current = false;
    stopRecognition();
    stopSpeech();
    setState("ended");
    setTranscript("");
    setAiResponse("");
    historyRef.current = [];
  }, [stopRecognition, stopSpeech]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) {
        stopSpeech();
      }
      return !prev;
    });
  }, [stopSpeech]);

  return {
    state,
    transcript,
    aiResponse,
    isMuted,
    startCall,
    endCall,
    toggleMute,
    isSupported: isSpeechRecognitionSupported(),
  };
}
