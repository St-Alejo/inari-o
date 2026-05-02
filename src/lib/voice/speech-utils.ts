export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    (window as unknown as Record<string, unknown>).SpeechRecognition ||
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition
  );
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferred = ["es-ES", "es-CO", "es-MX", "es-US", "es"];
  for (const lang of preferred) {
    const match = voices.find((v) => v.lang.startsWith(lang));
    if (match) return match;
  }
  return voices.find((v) => v.lang.startsWith("es")) ?? null;
}

// Convert price strings and symbols to spoken Spanish
export function normalizeTextForTTS(text: string): string {
  return text
    .replace(/\$\s*([\d.,]+)/g, (_, n) => {
      const num = parseInt(n.replace(/[.,]/g, ""), 10);
      if (isNaN(num)) return n;
      return numberToSpanish(num) + " pesos";
    })
    .replace(/\*/g, "")
    .replace(/#/g, "número ")
    .replace(/&/g, " y ")
    .replace(/\n+/g, ". ");
}

function numberToSpanish(n: number): string {
  if (n >= 1_000_000) {
    const m = Math.floor(n / 1_000_000);
    const rest = n % 1_000_000;
    return (
      (m === 1 ? "un millón" : `${m} millones`) +
      (rest > 0 ? " " + numberToSpanish(rest) : "")
    );
  }
  if (n >= 1_000) {
    const k = Math.floor(n / 1_000);
    const rest = n % 1_000;
    return (
      (k === 1 ? "mil" : `${k} mil`) +
      (rest > 0 ? " " + numberToSpanish(rest) : "")
    );
  }
  return n.toString();
}
