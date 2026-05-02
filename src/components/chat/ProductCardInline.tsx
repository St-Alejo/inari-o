"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

type InlineProduct = {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  stock: number;
  badge?: string | null;
  condition?: string;
  grade?: string | null;
};

export default function ProductCardInline({ product }: { product: InlineProduct }) {
  const { addItem } = useCart();
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    // Minimal product shape for cart
    const cartProduct = {
      id: product.slug,
      slug: product.slug,
      name: product.name,
      brand: "Apple" as const,
      category: "iphone" as const,
      condition: (product.condition as "nuevo" | "refurbished") ?? "nuevo",
      description: "",
      basePrice: product.price,
      stock: product.stock,
      releaseYear: 2023,
      specs: {},
      defaultImages: [product.image],
    } satisfies Product;

    addItem({
      id: `${product.slug}-none-none`,
      product: cartProduct,
      quantity: 1,
      price: product.price,
    });
  };

  return (
    <div
      className="flex gap-3 rounded-xl border p-3 my-2"
      style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center p-1.5" style={{ background: "#0d0d0d" }}>
        <Image src={product.image} alt={product.name} width={52} height={52} className="object-contain" />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="font-bold text-sm leading-tight truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
          {product.name}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-[#E3000B] font-bold text-sm">
            ${product.price.toLocaleString("es-CO")}
          </span>
          {product.originalPrice && (
            <span className="text-zinc-500 text-xs line-through">
              ${product.originalPrice.toLocaleString("es-CO")}
            </span>
          )}
          {savings > 0 && (
            <span className="text-emerald-400 text-[10px] font-semibold">-{savings}%</span>
          )}
        </div>
        <div className="flex gap-2 mt-1">
          <Link
            href={`/product/${product.slug}`}
            className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border border-zinc-700 rounded px-2 py-0.5"
          >
            Ver
          </Link>
          {product.stock > 0 && (
            <button
              onClick={handleAdd}
              className="text-[10px] uppercase tracking-widest text-white bg-[#E3000B] rounded px-2 py-0.5 hover:opacity-80 transition-opacity"
            >
              + Carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
