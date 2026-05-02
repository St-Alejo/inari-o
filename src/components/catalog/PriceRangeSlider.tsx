"use client";

import { useState } from "react";

export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  const [local, setLocal] = useState<[number, number]>(value);

  const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), local[1] - 100_000);
    const next: [number, number] = [v, local[1]];
    setLocal(next);
    onChange(next);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), local[0] + 100_000);
    const next: [number, number] = [local[0], v];
    setLocal(next);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>{fmt(local[0])}</span>
        <span>{fmt(local[1])}</span>
      </div>
      <div className="relative h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          className="absolute h-1 rounded-full"
          style={{
            background: "#E3000B",
            left: `${((local[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((local[1] - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={50_000}
          value={local[0]}
          onChange={handleMin}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          aria-label="Precio mínimo"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={50_000}
          value={local[1]}
          onChange={handleMax}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer"
          aria-label="Precio máximo"
        />
      </div>
      <div className="h-4" />
    </div>
  );
}
