"use client";

import Link from "next/link";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { text: string; dot: string; gap: string }> = {
  sm: { text: "text-lg", dot: "w-1 h-1", gap: "gap-0" },
  md: { text: "text-xl", dot: "w-1 h-1", gap: "gap-0" },
  lg: { text: "text-3xl", dot: "w-1.5 h-1.5", gap: "gap-0" },
};

export default function BrandLogo({
  size = "md",
  asLink = true,
  href = "/",
}: {
  size?: Size;
  asLink?: boolean;
  href?: string;
}) {
  const s = sizes[size];
  const inner = (
    <span className={`inline-flex items-center ${s.gap} group`}>
      <span
        className={`${s.text} font-bold tracking-tighter`}
        style={{ fontFamily: "'Syne', sans-serif", color: "#E3000B" }}
      >
        I
      </span>
      <span
        className={`${s.text} font-bold tracking-tighter text-white`}
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        nariño
      </span>
      <span
        className={`${s.dot} rounded-full ml-1 mb-2 opacity-60`}
        style={{ background: "#E3000B" }}
      />
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href={href} aria-label="Inariño — Inicio" className="inline-flex">
      {inner}
    </Link>
  );
}
