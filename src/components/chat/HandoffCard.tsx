export default function HandoffCard({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border p-4 my-2 hover:border-emerald-500/40 transition-colors"
      style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-sm text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          Hablar con un asesor
        </p>
        <p className="text-xs text-zinc-400">Abrir WhatsApp →</p>
      </div>
    </a>
  );
}
