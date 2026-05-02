"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Product, ProductColor, ProductVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import ConditionBadge from "@/components/catalog/ConditionBadge";
import FinanceSimulator from "@/components/finance/FinanceSimulator";
import { whatsappLink } from "@/lib/site-config";

type Tab = "descripcion" | "specs" | "garantia" | "envio";

export default function ProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const { toggle, has, isFull } = useCompare();
  const inCompare = has(product.id);

  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(product.colors?.[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("descripcion");
  const [mainImg, setMainImg] = useState(0);
  const [added, setAdded] = useState(false);

  const images = selectedColor?.images ?? product.defaultImages;
  const currentPrice = selectedVariant?.price ?? product.basePrice;
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant?.id ?? "none"}-${selectedColor?.id ?? "none"}`,
      product,
      color: selectedColor,
      variant: selectedVariant,
      quantity,
      price: currentPrice,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 800);
  };

  const handleBuyNow = () => {
    addItem({
      id: `${product.id}-${selectedVariant?.id ?? "none"}-${selectedColor?.id ?? "none"}`,
      product,
      color: selectedColor,
      variant: selectedVariant,
      quantity,
      price: currentPrice,
    });
    router.push("/checkout");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "descripcion", label: "Descripción" },
    { id: "specs", label: "Especificaciones" },
    { id: "garantia", label: "Garantía" },
    { id: "envio", label: "Envío" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-zinc-300">{product.name}</span>
        </div>
        <button onClick={() => router.back()} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
          {images.length > 1 && (
            <div className="flex flex-col gap-2 w-16 flex-shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(i)}
                  className={`w-16 h-16 rounded-lg border p-1.5 transition-colors overflow-hidden ${
                    mainImg === i ? "border-[#E3000B]" : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ background: "#0d0d0d" }}
                >
                  <Image src={img} alt={`Vista ${i + 1}`} width={48} height={48} className="object-contain w-full h-full" />
                </button>
              ))}
            </div>
          )}

          <div
            className="flex-1 card-surface rounded-2xl aspect-square relative overflow-hidden border"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-white" style={{ background: "#E3000B" }}>
                {product.badge}
              </div>
            )}
            {savings > 0 && (
              <div className="absolute top-4 right-4 z-10 px-2 py-1 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                -{savings}% desc.
              </div>
            )}
            <Image
              src={images[mainImg] ?? images[0]}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col pt-2">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <ConditionBadge condition={product.condition} grade={product.grade} size="md" />
            {product.stock > 0 && product.stock <= 3 && (
              <span className="text-amber-400 text-xs font-semibold">
                ¡Solo {product.stock} en stock!
              </span>
            )}
            {product.stock === 0 && (
              <span className="text-red-400 text-xs font-semibold">Agotado</span>
            )}
            {product.stock > 3 && (
              <span className="text-emerald-400 text-xs">En stock</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {product.name}
          </h1>

          <p className="text-zinc-400 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-bold text-[#E3000B]" style={{ fontFamily: "'Syne', sans-serif" }}>
              ${currentPrice.toLocaleString("es-CO")}
            </span>
            {product.originalPrice && (
              <span className="text-zinc-500 text-lg line-through">
                ${product.originalPrice.toLocaleString("es-CO")}
              </span>
            )}
            <span className="text-zinc-600 text-sm">COP</span>
          </div>

          <div className="h-px mb-8" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)" }} />

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Color — <span className="text-white">{selectedColor?.name}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => { setSelectedColor(color); setMainImg(0); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ border: selectedColor?.id === color.id ? "2px solid white" : "2px solid transparent", padding: "2px" }}
                    aria-label={`Seleccionar color ${color.name}`}
                  >
                    <span className="w-full h-full rounded-full border border-white/20" style={{ background: color.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Capacidad / Modelo
              </h3>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: selectedVariant?.id === variant.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      border: selectedVariant?.id === variant.id ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: selectedVariant?.id === variant.id ? "#fff" : "#a1a1aa",
                    }}
                  >
                    {variant.name}
                    {product.basePrice !== variant.price && (
                      <span className="block text-[10px] opacity-60">
                        +${(variant.price - product.basePrice).toLocaleString("es-CO")}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Cantidad</span>
            <div className="flex items-center border rounded-md" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">-</button>
              <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(q + 1, product.stock || 10))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">+</button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="btn-primary justify-center flex-1 py-4 text-sm disabled:opacity-40"
            >
              Comprar ahora
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`btn-outline justify-center flex-1 py-4 text-sm transition-all ${added ? "border-emerald-500 text-emerald-400" : ""}`}
            >
              {added ? "¡Agregado! ✓" : "Agregar al carrito"}
            </button>
          </div>

          {/* Secondary actions */}
          <div className="flex gap-3 flex-wrap mb-8">
            <button
              onClick={() => toggle(product)}
              disabled={isFull && !inCompare}
              className={`flex items-center gap-2 text-xs px-3 py-2 rounded border transition-colors ${
                inCompare
                  ? "border-[#E3000B]/50 text-[#E3000B]"
                  : "border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="11" y1="18" x2="21" y2="18" />
              </svg>
              {inCompare ? "En comparador" : "Comparar"}
            </button>

            <a
              href={whatsappLink(`Hola, quisiera información sobre ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs px-3 py-2 rounded border border-zinc-700 text-zinc-500 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Preguntar por WhatsApp
            </a>

            <button
              className="flex items-center gap-2 text-xs px-3 py-2 rounded border border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300 transition-colors"
              onClick={() => {
                const el = document.getElementById("chat-widget-trigger");
                if (el) el.click();
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" />
                <path d="M9 9h.01M15 9h.01M9 15a3 3 0 0 0 6 0" />
              </svg>
              Pregúntale al asistente
            </button>
          </div>

          {/* Finance simulator */}
          <FinanceSimulator price={currentPrice} />
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex border-b gap-0 flex-wrap" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3.5 text-sm font-semibold transition-colors relative ${
                activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "#E3000B" }} />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "descripcion" && (
            <p className="text-zinc-300 leading-relaxed max-w-2xl">{product.description}</p>
          )}
          {activeTab === "specs" && (
            <div className="max-w-2xl border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-4 border-b flex flex-col sm:flex-row sm:gap-8" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <span className="text-zinc-500 text-sm w-40 shrink-0 font-medium">{key}</span>
                  <span className="text-zinc-200 text-sm">{value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "garantia" && (
            <div className="max-w-2xl text-zinc-300 leading-relaxed space-y-4">
              {product.condition === "nuevo" ? (
                <>
                  <p><strong className="text-white">12 meses</strong> de garantía oficial Apple desde la fecha de compra, conforme a la Ley 1480 de 2011.</p>
                  <p>Cubre defectos de fábrica en hardware y software. No cubre daños físicos ni por líquidos.</p>
                  <p>Para hacer efectiva la garantía, escríbanos por WhatsApp con su número de pedido y factura.</p>
                </>
              ) : (
                <>
                  <p><strong className="text-white">6 meses</strong> de garantía Inariño. Cubre defectos de funcionamiento.</p>
                  <p>No cubre desgaste estético propio del grado indicado ni daños causados por el usuario.</p>
                  <p>Para hacer efectiva la garantía, escríbanos por WhatsApp con su número de pedido.</p>
                </>
              )}
            </div>
          )}
          {activeTab === "envio" && (
            <div className="max-w-2xl text-zinc-300 leading-relaxed space-y-4">
              <p>Despachamos desde <strong className="text-white">Pasto, Nariño</strong> con transportadoras aliadas.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Pasto: mismo día o siguiente hábil (gratis sobre $200.000)</li>
                <li>Resto de Nariño: 24–48 horas hábiles</li>
                <li>Nacional: 48–72 horas hábiles (gratis sobre $800.000)</li>
              </ul>
              <p className="text-sm text-zinc-500">Le compartimos número de guía por WhatsApp al momento del despacho.</p>
              <Link href="/envios" className="text-[#E3000B] text-sm hover:underline">Ver política completa de envíos →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
