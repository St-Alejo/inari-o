"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

export default function SeguimientoPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();
    if (id) router.push(`/seguimiento/${id}`);
  };

  return (
    <>
      <PageHeader title="Seguimiento de pedido" description="Ingresa tu número de pedido para ver el estado de tu compra." />

      <section className="max-w-lg mx-auto px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-8 flex flex-col gap-5"
          style={{ background: "var(--surface)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
              Número de pedido
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="INN-20240501-1234"
              className="bg-[var(--black)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E3000B]/60 transition-colors placeholder:text-zinc-600 font-mono"
            />
            <p className="text-[11px] text-zinc-600">
              Lo encontrarás en la página de confirmación o en tu correo de pedido.
            </p>
          </div>

          <button
            type="submit"
            disabled={!orderId.trim()}
            className="btn-primary w-full py-4 justify-center disabled:opacity-40"
          >
            Consultar pedido
          </button>
        </form>
      </section>
    </>
  );
}
