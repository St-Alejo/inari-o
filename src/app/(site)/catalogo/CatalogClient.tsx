"use client";

import { useState, useMemo } from "react";
import { getCatalog, getGlobalPriceRange, type CatalogFilters, type SortOption } from "@/lib/catalog";
import ProductCard from "@/components/catalog/ProductCard";
import Filters from "@/components/catalog/Filters";
import SortBar from "@/components/catalog/SortBar";
import CompareBar from "@/components/catalog/CompareBar";
import { CompareProvider } from "@/context/CompareContext";
import type { ProductCondition } from "@/data/products";

export default function CatalogClient({
  initialCategory,
  initialCondition,
  initialQ,
}: {
  initialCategory?: string;
  initialCondition?: ProductCondition;
  initialQ?: string;
}) {
  const globalRange = useMemo(() => getGlobalPriceRange(), []);

  const [filters, setFilters] = useState<CatalogFilters>({
    category: initialCategory,
    condition: initialCondition,
    q: initialQ,
  });
  const [sort, setSort] = useState<SortOption>("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([globalRange.min, globalRange.max]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => getCatalog(filters, sort), [filters, sort]);

  const updateFilters = (patch: Partial<CatalogFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const resetFilters = () => {
    setFilters({ category: initialCategory });
    setPriceRange([globalRange.min, globalRange.max]);
  };

  return (
    <CompareProvider>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile filter toggle */}
        <button
          className="lg:hidden flex items-center gap-2 text-sm border rounded-md px-4 py-2 self-start"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          Filtros
        </button>

        {/* Sidebar */}
        <div className={`lg:w-56 flex-shrink-0 ${filtersOpen ? "block" : "hidden"} lg:block`}>
          <Filters
            filters={filters}
            priceRange={priceRange}
            globalPriceRange={globalRange}
            availableStorages={[]}
            onChange={(patch) => {
              if ("minPrice" in patch || "maxPrice" in patch) {
                const newMin = patch.minPrice ?? globalRange.min;
                const newMax = patch.maxPrice ?? globalRange.max;
                setPriceRange([newMin, newMax]);
              }
              updateFilters(patch);
            }}
            onReset={resetFilters}
          />
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <SortBar value={sort} onChange={setSort} count={results.length} />

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-zinc-500 gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <p>No hay productos con esos filtros.</p>
              <button onClick={resetFilters} className="btn-outline text-xs py-2 px-5">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <CompareBar />
    </CompareProvider>
  );
}
