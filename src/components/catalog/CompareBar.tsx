"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";

export default function CompareBar() {
  const { items, remove, clear } = useCompare();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.15 }}
          className="fixed bottom-0 left-0 right-0 z-50 nav-glass border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-zinc-400 uppercase tracking-widest hidden sm:block">Comparar:</span>
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
                  <Image
                    src={p.defaultImages[0]}
                    alt={p.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                  <span className="text-xs text-zinc-200 max-w-[120px] truncate">{p.name}</span>
                  <button
                    onClick={() => remove(p.id)}
                    className="text-zinc-500 hover:text-white transition-colors ml-1"
                    aria-label={`Quitar ${p.name} del comparador`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={clear} className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
                Limpiar
              </button>
              <Link
                href={`/comparar?ids=${items.map((p) => p.id).join(",")}`}
                className="btn-primary text-xs py-2 px-4"
              >
                Comparar {items.length}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
