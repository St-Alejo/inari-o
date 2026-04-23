"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();

  // Close when pressing Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsCartOpen]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const formatPrice = (price: number) => {
    return "$" + price.toLocaleString("es-CO");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-md bg-[var(--surface)] border-l flex flex-col"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                Tu Carrito
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <p>Tu carrito está vacío.</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn-outline mt-2 text-xs">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded bg-[#0d0d0d] flex items-center justify-center flex-shrink-0 border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <Image
                        src={item.color?.images[0] || item.product.defaultImages[0]}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-sm tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>{item.product.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-zinc-500 hover:text-red-500 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                        {(item.color || item.variant) && (
                          <p className="text-[11px] text-zinc-400 mt-1">
                            {[item.variant?.name, item.color?.name].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">-</button>
                          <span className="w-7 text-center text-xs text-zinc-300">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">+</button>
                        </div>
                        <p className="font-bold text-sm" style={{ color: "#E3000B" }}>{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t bg-black/20" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-400 text-sm">Subtotal</span>
                  <span className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>{formatPrice(cartTotal)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full justify-center py-4 text-sm"
                >
                  Proceder al Checkout
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center mt-4 text-xs tracking-widest uppercase text-zinc-500 hover:text-white transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
