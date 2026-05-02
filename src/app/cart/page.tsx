"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal } = useCart();
  const formatPrice = (price: number) => "$" + price.toLocaleString("es-CO");

  const shippingCost = items.length > 0 ? 0 : 0; // Envío gratis
  const finalTotal = cartTotal + shippingCost;

  return (
    <main className="bg-[var(--black)] min-h-screen text-white pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20 min-h-[70vh]">
        <h1 className="text-4xl md:text-5xl font-bold mb-10" style={{ fontFamily: "'Syne', sans-serif" }}>
          Tu Carrito
        </h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 border rounded-2xl bg-[var(--surface)] text-zinc-400" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-6 opacity-50">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Tu carrito está vacío</h2>
            <p className="mb-8 text-sm">Parece que no has añadido nada aún.</p>
            <Link href="/" className="btn-primary">
              Volver a la tienda
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Items list */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-xs font-bold tracking-widest text-zinc-500 uppercase" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="col-span-6">Producto</div>
                <div className="col-span-3 text-center">Cantidad</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {items.map(item => (
                <motion.div layout key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b items-center" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="md:col-span-6 flex gap-6 items-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-[var(--surface)] flex items-center justify-center flex-shrink-0 border p-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <Image
                        src={item.color?.images[0] || item.product.defaultImages[0]}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                        <Link href={`/product/${item.product.slug}`} className="hover:text-[var(--red)] transition-colors">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-zinc-400 text-sm mb-3">
                        {[item.variant?.name, item.color?.name].filter(Boolean).join(" · ")}
                      </p>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-zinc-500 hover:text-red-500 transition-colors uppercase tracking-widest font-bold">
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-3 flex md:justify-center">
                    <div className="flex items-center border rounded-md" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">-</button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">+</button>
                    </div>
                  </div>

                  <div className="md:col-span-3 flex md:justify-end">
                    <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[var(--surface)] rounded-2xl p-8 border sticky top-28" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Resumen del pedido</h3>
                
                <div className="flex flex-col gap-4 text-sm text-zinc-300 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-500">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-6 mb-8">
                  <span className="font-bold text-white">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--red)]" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {formatPrice(finalTotal)}
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Incluye IVA</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary w-full justify-center py-4 text-base">
                  Proceder al pago
                </Link>
                
                <div className="mt-6 flex flex-col gap-3 text-xs text-zinc-500 items-center text-center">
                  <p>Pagos seguros con Wompi</p>
                  <div className="flex gap-2 opacity-50 grayscale">
                    {/* Just visual placeholders for payment methods */}
                    <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">VISA</div>
                    <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">MC</div>
                    <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">PSE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
