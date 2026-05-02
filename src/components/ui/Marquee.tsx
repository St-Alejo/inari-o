"use client";

type Props = {
  items: string[];
  speed?: number;
  className?: string;
};

export default function Marquee({ items, speed = 40, className = "" }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden w-full select-none ${className}`} aria-hidden>
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-zinc-600 text-sm font-medium tracking-widest uppercase">
              {item}
            </span>
            <span className="text-[#E3000B] opacity-40 text-xs">◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-scroll { animation: none; }
        }
      `}</style>
    </div>
  );
}
