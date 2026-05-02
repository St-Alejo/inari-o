"use client";

import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const dx = (e.clientX - (left + width / 2)) * strength;
    const dy = (e.clientY - (top + height / 2)) * strength;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </button>
  );
}
