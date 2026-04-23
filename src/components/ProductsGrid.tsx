"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";
import Link from "next/link";

export default function ProductsGrid() {
  const iphones = products.filter(p => p.category === "iphone").slice(0, 5);

  return (
    <section id="iphones" className="py-32 px-6" style={{ background: "var(--black)" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="pill-label mb-4 block">Colección</span>
            <h2
              className="text-white font-bold leading-none"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", letterSpacing: "-0.02em" }}
            >
              iPhones
            </h2>
          </div>
          <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">
            Todos los modelos actuales. Originales, sellados y con garantía Apple en Nariño.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {iphones.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              key={product.id}
            >
            <Link
              href={`/product/${product.slug}`}
              className="prod-card group relative cursor-pointer flex flex-col w-full h-full block"
              style={{
                background: "var(--card)",
                borderRight: i < products.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                minHeight: 380,
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div
                  className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] uppercase text-white"
                  style={{ background: "#E3000B" }}
                >
                  {product.badge}
                </div>
              )}

              {/* Number */}
              <div className="absolute top-4 right-4 text-[11px] font-mono text-zinc-800">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Image */}
              <div className="relative flex-1 flex items-center justify-center p-6 pt-12">
                <div className="relative w-full" style={{ height: 200 }}>
                  <Image
                    src={product.defaultImages[0]}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw"
                  />
                </div>
              </div>

              {/* Info */}
              <div
                className="p-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-[11px] text-zinc-600 mb-1 tracking-wide uppercase">{product.category}</p>
                <h3
                  className="text-white font-bold text-base mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {product.name}
                </h3>
                <p className="font-bold text-sm mb-4" style={{ color: "#E3000B" }}>
                  ${product.basePrice.toLocaleString("es-CO")} <span className="text-zinc-700 font-normal text-xs">COP</span>
                </p>

                <div className="card-cta w-full py-2.5 text-xs font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-black flex justify-center"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: "3px" }}>
                  Ver Detalles
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a href="#" className="btn-outline text-sm">
            Ver toda la colección
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
