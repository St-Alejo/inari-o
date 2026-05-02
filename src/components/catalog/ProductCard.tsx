"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import type { Product } from "@/data/products";
import ConditionBadge from "./ConditionBadge";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has, isFull } = useCompare();
  const inCompare = has(product.id);
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${product.id}-none-none`,
      product,
      quantity: 1,
      price: product.basePrice,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="prod-card card-surface rounded-xl overflow-hidden group flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="block relative bg-[#0d0d0d] aspect-square p-6">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] uppercase text-white bg-[#E3000B]">
            {product.badge}
          </span>
        )}
        {savings > 0 && (
          <span className="absolute top-3 right-3 z-10 px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
            -{savings}%
          </span>
        )}
        {product.stock <= 2 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 z-10 text-[9px] text-amber-400 font-semibold">
            ¡Solo {product.stock} en stock!
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-xs text-zinc-400 font-semibold">
            Agotado
          </span>
        )}
        <Image
          src={product.defaultImages[0]}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between gap-2">
          <ConditionBadge condition={product.condition} grade={product.grade} />
          <button
            onClick={() => toggle(product)}
            disabled={isFull && !inCompare}
            title={inCompare ? "Quitar del comparador" : "Comparar"}
            className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border transition-colors ${
              inCompare
                ? "border-[#E3000B]/50 text-[#E3000B] bg-[#E3000B]/10"
                : isFull
                ? "border-zinc-700 text-zinc-600 cursor-not-allowed"
                : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
            }`}
          >
            {inCompare ? "✓ Comparando" : "Comparar"}
          </button>
        </div>

        <Link href={`/product/${product.slug}`} className="block hover:text-[#E3000B] transition-colors">
          <h3
            className="font-bold text-sm leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span
            className="font-bold text-lg text-[#E3000B]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ${product.basePrice.toLocaleString("es-CO")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-500 line-through">
              ${product.originalPrice.toLocaleString("es-CO")}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="card-cta w-full btn-primary text-xs py-2.5 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
        </button>
      </div>
    </motion.div>
  );
}
