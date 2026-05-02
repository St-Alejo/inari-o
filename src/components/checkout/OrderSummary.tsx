"use client";

import Image from "next/image";
import type { CartItem } from "@/context/CartContext";

type Props = {
  items: CartItem[];
  cartTotal: number;
  shippingCost: number;
};

export default function OrderSummary({ items, cartTotal, shippingCost }: Props) {
  const fmt = (n: number) => "$" + n.toLocaleString("es-CO");
  const final = cartTotal + shippingCost;

  return (
    <div className="w-full max-w-md pt-8 sticky top-16">
      <h3 className="text-sm font-bold text-zinc-400 mb-8 uppercase tracking-widest">
        Resumen del pedido
      </h3>

      <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-lg bg-[var(--black)] border border-white/10 flex items-center justify-center p-2 flex-shrink-0">
              <Image
                src={item.color?.images[0] ?? item.product.defaultImages[0]}
                alt={item.product.name}
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-600 flex items-center justify-center text-[10px] font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
                {item.product.name}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {[item.variant?.name, item.color?.name].filter(Boolean).join(" · ")}
              </p>
            </div>
            <span className="text-sm font-medium flex-shrink-0">{fmt(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 py-6 border-y border-white/10 text-sm">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span>{fmt(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Envío</span>
          <span className={shippingCost === 0 ? "text-emerald-400" : "text-white"}>
            {shippingCost === 0 ? "Gratis" : fmt(shippingCost)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end pt-6">
        <span className="text-xl font-bold">Total</span>
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-zinc-500">COP</span>
          <span
            className="text-3xl font-bold"
            style={{ color: "#E3000B", fontFamily: "'Syne', sans-serif" }}
          >
            {fmt(final)}
          </span>
        </div>
      </div>
    </div>
  );
}
