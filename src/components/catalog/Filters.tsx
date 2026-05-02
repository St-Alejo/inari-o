"use client";

import PriceRangeSlider from "./PriceRangeSlider";
import type { CatalogFilters } from "@/lib/catalog";
import type { ProductCondition, ProductGrade } from "@/data/products";

type FiltersProps = {
  filters: CatalogFilters;
  priceRange: [number, number];
  globalPriceRange: { min: number; max: number };
  availableStorages: string[];
  onChange: (updated: Partial<CatalogFilters>) => void;
  onReset: () => void;
};

const grades: { value: ProductGrade; label: string }[] = [
  { value: "A", label: "Grado A · Excelente" },
  { value: "B", label: "Grado B · Bueno" },
  { value: "C", label: "Grado C · Aceptable" },
];

const storageOptions = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"];

export default function Filters({
  filters,
  priceRange,
  globalPriceRange,
  onChange,
  onReset,
}: FiltersProps) {
  const toggleCondition = (cond: ProductCondition) => {
    onChange({ condition: filters.condition === cond ? undefined : cond });
  };

  const toggleGrade = (g: ProductGrade) => {
    const cur = filters.grade ?? [];
    const next = cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g];
    onChange({ grade: next.length ? next : undefined });
  };

  const toggleStorage = (s: string) => {
    const cur = filters.storage ?? [];
    const next = cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s];
    onChange({ storage: next.length ? next : undefined });
  };

  const hasActiveFilters =
    !!filters.condition ||
    !!filters.grade?.length ||
    !!filters.storage?.length ||
    (filters.minPrice !== undefined && filters.minPrice > globalPriceRange.min) ||
    (filters.maxPrice !== undefined && filters.maxPrice < globalPriceRange.max);

  return (
    <aside className="flex flex-col gap-6 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xs uppercase tracking-widest text-zinc-400">Filtros</h2>
        {hasActiveFilters && (
          <button onClick={onReset} className="text-[10px] text-[#E3000B] uppercase tracking-widest hover:opacity-70 transition-opacity">
            Limpiar
          </button>
        )}
      </div>

      {/* Condición */}
      <section>
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Condición</h3>
        <div className="flex flex-col gap-2">
          {(["nuevo", "refurbished"] as ProductCondition[]).map((cond) => (
            <label key={cond} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.condition === cond}
                onChange={() => toggleCondition(cond)}
                className="w-3.5 h-3.5 rounded border border-zinc-600 bg-transparent accent-[#E3000B] cursor-pointer"
              />
              <span className="text-zinc-300 group-hover:text-white transition-colors capitalize text-sm">
                {cond === "nuevo" ? "Nuevo" : "Reacondicionado"}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Grado (solo si condición = refurbished o ninguna) */}
      {filters.condition !== "nuevo" && (
        <section>
          <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Grado</h3>
          <div className="flex flex-col gap-2">
            {grades.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={!!filters.grade?.includes(value)}
                  onChange={() => toggleGrade(value)}
                  className="w-3.5 h-3.5 rounded border border-zinc-600 bg-transparent accent-[#E3000B] cursor-pointer"
                />
                <span className="text-zinc-300 group-hover:text-white transition-colors text-sm">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Almacenamiento */}
      <section>
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Almacenamiento</h3>
        <div className="flex flex-wrap gap-2">
          {storageOptions.map((s) => (
            <button
              key={s}
              onClick={() => toggleStorage(s)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                filters.storage?.includes(s)
                  ? "border-[#E3000B] text-[#E3000B] bg-[#E3000B]/10"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Precio */}
      <section>
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Precio</h3>
        <PriceRangeSlider
          min={globalPriceRange.min}
          max={globalPriceRange.max}
          value={priceRange}
          onChange={([min, max]) =>
            onChange({
              minPrice: min > globalPriceRange.min ? min : undefined,
              maxPrice: max < globalPriceRange.max ? max : undefined,
            })
          }
        />
      </section>
    </aside>
  );
}
