export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-[#E3000B]/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-bold text-[#E3000B]">I</span>
      </div>
      <div
        className="px-3 py-2.5 rounded-2xl rounded-bl-sm"
        style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-zinc-500"
              style={{
                animation: `bounce 1.2s infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
