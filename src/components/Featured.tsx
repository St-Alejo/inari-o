"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Featured() {
  return (
    <section id="featured" className="relative py-32 overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Vertical red accent line — left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #E3000B 30%, #E3000B 70%, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image side ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Outer frame */}
            <div
              className="relative w-full max-w-sm aspect-[3/4] rounded-lg overflow-hidden"
              style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: "#E3000B" }} />
              <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "#E3000B" }} />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "#E3000B" }} />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: "#E3000B" }} />

              {/* Badge */}
              <div
                className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-white"
                style={{ background: "#E3000B" }}
              >
                NUEVO
              </div>

              <Image
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=2560&hei=1440&fmt=p-jpg&bgc=000000&.v=1692937780973"
                alt="iPhone 15 Pro Black Titanium"
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Floating spec card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-4 lg:-right-8 card-surface rounded-lg px-5 py-4 shadow-2xl"
            >
              <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">Chip</p>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>A17 Pro</p>
              <p className="text-[11px] text-zinc-500 mt-1">3 nm · 6 núcleos GPU</p>
            </motion.div>
          </motion.div>

          {/* ── Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="flex flex-col gap-7"
          >
            <span className="pill-label">Destacado</span>

            <h2
              className="text-white font-bold leading-[1.05]"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.6rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              iPhone 15 Pro.
              <br />
              <span style={{ color: "#E3000B" }}>Titanio</span>{" "}
              aeroespacial.
            </h2>

            <p className="text-zinc-500 text-base leading-relaxed max-w-md">
              El primer iPhone con estructura de titanio aeroespacial. Chip A17 Pro, cámara de 48 MP y el nuevo botón de acción. Disponible en iNariño.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] text-zinc-600 uppercase tracking-widest">Desde</span>
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: "'Syne', sans-serif", color: "#E3000B" }}
              >
                $4.299.000
              </span>
              <span className="text-zinc-600 text-sm">COP</span>
            </div>

            {/* Spec tags */}
            <div className="flex flex-wrap gap-2">
              {["Chip A17 Pro", "Titanio", "48 MP", "USB 3", "Action Button"].map((s) => (
                <span
                  key={s}
                  className="text-[11px] px-3 py-1.5 font-medium tracking-wide"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#9a9a9a",
                    borderRadius: "3px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap pt-2">
              <Link href="/product/iphone-15-pro" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  Comprar ahora
                </motion.a>
              </Link>
              <Link href="/product/iphone-15-pro" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline"
                >
                  Conocer más
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
