"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderTimeline from "@/components/checkout/OrderTimeline";
import { createOrder, type Order } from "@/lib/orders/mock-store";

function SuccessContent() {
  const searchParams = useSearchParams();
  const wompiId = searchParams.get("id");
  const { items, cartTotal, clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) return;
    setCleared(true);

    // Build order from cart (best-effort — cart may already be empty on reload)
    const orderItems = items.map((i) => ({
      name: i.product.name,
      variant: i.variant?.name,
      color: i.color?.name,
      quantity: i.quantity,
      price: i.price,
      image: i.color?.images[0] ?? i.product.defaultImages[0],
    }));

    const newOrder = createOrder({
      items: orderItems.length > 0 ? orderItems : [{ name: "Producto", quantity: 1, price: cartTotal, image: "/images/placeholder.png" }],
      total: cartTotal,
      shippingCost: 0,
      customer: {
        name: "Cliente",
        email: "",
        phone: "",
        address: "",
        city: "Pasto",
      },
      wompiId: wompiId ?? undefined,
    });

    setOrder(newOrder);
    clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-16 px-6 mt-16 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
        className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6 border border-emerald-500/25"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-white"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        ¡Pedido recibido!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-zinc-400 text-base mb-8 max-w-md"
      >
        Tu pedido está siendo procesado. Te notificaremos por WhatsApp cuando esté listo.
      </motion.p>

      {order && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="w-full mb-8 rounded-2xl border p-6 text-left"
          style={{ background: "var(--surface)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Número de pedido</p>
              <p className="font-mono font-bold text-lg text-white">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Entrega estimada</p>
              <p className="text-sm font-medium text-white capitalize">{order.estimatedDelivery}</p>
            </div>
          </div>

          <OrderTimeline timeline={order.timeline} />
        </motion.div>
      )}

      {wompiId && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border px-4 py-3 mb-6 text-left inline-block"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
        >
          <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Referencia Wompi</span>
          <span className="font-mono text-white text-sm">{wompiId}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-3 flex-wrap justify-center"
      >
        {order && (
          <Link
            href={`/seguimiento/${order.id}`}
            className="btn-primary"
          >
            Seguir mi pedido →
          </Link>
        )}
        <Link href="/" className="py-3 px-6 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="bg-[var(--black)] min-h-screen text-white flex flex-col">
      <Navbar />
      <div
        className="flex-1 flex justify-center"
        style={{ background: "radial-gradient(ellipse at top, rgba(34,197,94,0.04) 0%, transparent 60%)" }}
      >
        <Suspense fallback={<div className="flex items-center justify-center w-full py-40 text-zinc-500">Cargando…</div>}>
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
