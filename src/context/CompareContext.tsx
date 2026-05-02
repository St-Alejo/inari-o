"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "@/data/products";

const MAX_COMPARE = 3;
const STORAGE_KEY = "inariño_compare_v1";

type CompareContextValue = {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  toggle: (product: Product) => void;
  has: (id: string) => boolean;
  clear: () => void;
  isFull: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.length >= MAX_COMPARE || prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggle = useCallback(
    (product: Product) => {
      setItems((prev) => {
        if (prev.some((p) => p.id === product.id))
          return prev.filter((p) => p.id !== product.id);
        if (prev.length >= MAX_COMPARE) return prev;
        return [...prev, product];
      });
    },
    []
  );

  const has = useCallback((id: string) => items.some((p) => p.id === id), [items]);
  const clear = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider
      value={{ items, add, remove, toggle, has, clear, isFull: items.length >= MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside <CompareProvider>");
  return ctx;
}
