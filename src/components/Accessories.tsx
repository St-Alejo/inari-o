"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { products } from "@/data/products";
import Link from "next/link";
export default function Accessories() {
  const accessories = products.filter(p => p.category === "accessory");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section id="accesorios" className="py-32 overflow-hidden" style={{ background: "var(--black)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <span className="pill-label mb-4 block">Complementa tu experiencia</span>
            <h2
              className="text-white font-bold leading-none"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", letterSpacing: "-0.02em" }}
            >
              Accesorios
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#9a9a9a" }}
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente"
              className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#9a9a9a" }}
            >
              →
            </button>
          </div>
        </motion.div>

        {/* ── Carousel ── */}
        <div
          ref={scrollRef}
          className="flex gap-px overflow-x-auto scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {accessories.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex-shrink-0"
              style={{
                width: 260,
                scrollSnapAlign: "start",
                borderRight: i < accessories.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
            <Link
              href={`/product/${item.slug}`}
              className="prod-card flex flex-col cursor-pointer w-full h-full block"
              style={{ background: "var(--card)" }}
            >
              {/* Image */}
              <div
                className="relative flex items-center justify-center"
                style={{ height: 220, background: "#0d0d0d" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.defaultImages[0]}
                    alt={item.name}
                    fill
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    sizes="260px"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] text-zinc-600 tracking-wide mb-1 uppercase">{item.category}</p>
                <h3
                  className="text-white font-bold text-sm mb-2 leading-snug"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.name}
                </h3>
                <p className="font-bold text-sm mb-4" style={{ color: "#E3000B" }}>
                  ${item.basePrice.toLocaleString("es-CO")} <span className="text-zinc-700 font-normal text-xs">COP</span>
                </p>
                <div
                  className="card-cta mt-auto w-full py-2.5 flex justify-center text-xs font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-black"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "3px" }}
                >
                  Ver más
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
