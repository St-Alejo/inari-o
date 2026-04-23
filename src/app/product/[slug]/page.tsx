"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getProductBySlug, Product, ProductColor, ProductVariant } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const { addItem, setIsCartOpen } = useCart();

  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(product.colors?.[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);

  const images = selectedColor?.images || product.defaultImages;
  const currentPrice = selectedVariant?.price || product.basePrice;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant?.id || "none"}-${selectedColor?.id || "none"}`,
      product,
      color: selectedColor,
      variant: selectedVariant,
      quantity,
      price: currentPrice,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a full implementation, you might want to redirect to /checkout directly
  };

  return (
    <main className="bg-[var(--black)] min-h-screen text-white pt-24">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href={`/#${product.category === "iphone" ? "iphones" : product.category === "watch" ? "apple-watch" : "accesorios"}`} className="hover:text-white transition-colors capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
          
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            ← Volver
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="card-surface rounded-2xl flex items-center justify-center p-12 aspect-square relative border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-white" style={{ background: "#E3000B" }}>
                  {product.badge}
                </div>
              )}
              <div className="relative w-full h-full max-w-md max-h-[500px]">
                <Image
                  src={images[0]}
                  alt={`${product.name} - ${selectedColor?.name || ""}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col pt-4"
          >
            <span className="text-[10px] text-zinc-500 tracking-widest uppercase mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              {product.name}
            </h1>
            
            <p className="text-zinc-400 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="text-3xl font-bold mb-10 text-[var(--red)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              ${currentPrice.toLocaleString("es-CO")} <span className="text-zinc-600 text-sm font-normal">COP</span>
            </div>

            <div className="h-px w-full mb-10" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)' }} />

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Color — <span className="text-white">{selectedColor?.name}</span></h3>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{ 
                        border: selectedColor?.id === color.id ? '2px solid white' : '2px solid transparent',
                        padding: '2px'
                      }}
                      aria-label={`Seleccionar ${color.name}`}
                    >
                      <span className="w-full h-full rounded-full border border-white/20" style={{ background: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Modelo / Capacidad</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className="py-4 px-4 rounded-lg flex flex-col items-center justify-center gap-1 transition-all"
                      style={{
                        background: selectedVariant?.id === variant.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                        border: selectedVariant?.id === variant.id ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <span className="font-bold text-sm" style={{ color: selectedVariant?.id === variant.id ? 'white' : '#a1a1aa' }}>{variant.name}</span>
                      {product.basePrice !== variant.price && (
                        <span className="text-[10px] text-zinc-500">
                          + ${(variant.price - product.basePrice).toLocaleString('es-CO')}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Cantidad</span>
              <div className="flex items-center border rounded-md" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">-</button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button 
                onClick={handleBuyNow} 
                className="btn-primary justify-center flex-1 py-4 text-base"
              >
                Comprar Ahora
              </button>
              <button 
                onClick={handleAddToCart}
                className="btn-outline justify-center flex-1 py-4 text-base"
              >
                Agregar al Carrito
              </button>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Especificaciones principales</h3>
              <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="py-4 border-b flex flex-col sm:flex-row sm:gap-8" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <span className="text-zinc-500 text-sm font-medium w-32 shrink-0">{key}</span>
                    <span className="text-zinc-200 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
