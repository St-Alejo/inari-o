"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getOrder, advanceStatus, type Order } from "@/lib/orders/mock-store";
import OrderTimeline from "@/components/checkout/OrderTimeline";
import { siteConfig } from "@/lib/site-config";

export default function TrackingDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null | "loading">("loading");

  useEffect(() => {
    const found = getOrder(orderId);
    setOrder(found);
  }, [orderId]);

  if (order === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-zinc-500">
        Cargando…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-2xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          Pedido no encontrado
        </p>
        <p className="text-zinc-400 mb-8">
          No encontramos el pedido <span className="font-mono text-white">{orderId}</span>.
          Verifica el número e intenta de nuevo.
        </p>
        <Link href="/seguimiento" className="btn-primary">
          Buscar otro pedido
        </Link>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hola Inariño, quiero consultar el estado de mi pedido ${order.id}.`
  )}`;

  const handleAdvance = () => {
    const updated = advanceStatus(order.id);
    if (updated) setOrder({ ...updated });
  };

  const STATUS_COLORS: Record<string, string> = {
    procesando: "#f59e0b",
    verificando: "#3b82f6",
    preparando: "#8b5cf6",
    enviado: "#06b6d4",
    entregado: "#22c55e",
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/seguimiento"
        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Buscar otro pedido
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border p-8"
        style={{ background: "var(--surface)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Número de pedido</p>
            <p className="font-mono font-bold text-xl text-white">{order.id}</p>
            <p className="text-xs text-zinc-600 mt-1">{order.createdAt}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Estado</p>
            <span
              className="text-sm font-bold capitalize px-3 py-1 rounded-full"
              style={{
                background: `${STATUS_COLORS[order.status]}18`,
                color: STATUS_COLORS[order.status],
                border: `1px solid ${STATUS_COLORS[order.status]}33`,
              }}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="rounded-xl px-4 py-3 mb-8 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3000B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <div>
            <p className="text-xs text-zinc-500">Entrega estimada</p>
            <p className="text-sm font-medium text-white capitalize">{order.estimatedDelivery}</p>
          </div>
        </div>

        {/* Timeline */}
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">
          Estado del pedido
        </h3>
        <OrderTimeline timeline={order.timeline} />

        {/* Actions */}
        <div className="flex gap-3 flex-wrap mt-8 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Contactar asesor
          </a>

          {/* Demo: advance status button */}
          {order.status !== "entregado" && (
            <button
              onClick={handleAdvance}
              className="text-sm px-4 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white transition-colors"
              title="Demo: avanzar estado"
            >
              Simular avance →
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
