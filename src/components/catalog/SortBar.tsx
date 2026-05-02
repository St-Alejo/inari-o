"use client";

import type { SortOption } from "@/lib/catalog";

const options: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "newest", label: "Más nuevos" },
  { value: "name", label: "Nombre A–Z" },
];

export default function SortBar({
  value,
  onChange,
  count,
}: {
  value: SortOption;
  onChange: (s: SortOption) => void;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <p className="text-zinc-500 text-sm">
        <span className="text-white font-semibold">{count}</span>{" "}
        {count === 1 ? "producto" : "productos"}
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-xs text-zinc-500 hidden sm:block">
          Ordenar por:
        </label>
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="text-sm text-white rounded-md px-3 py-1.5 focus:outline-none focus:border-[#E3000B] appearance-none cursor-pointer"
          style={{
            background: "var(--card)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} style={{ background: "#131313" }}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
