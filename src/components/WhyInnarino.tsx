"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    num: "01",
    title: "100% Originales",
    description: "Garantía Apple oficial. Todos nuestros productos son importados directamente con garantía de fábrica.",
  },
  {
    num: "02",
    title: "Envío a Todo Colombia",
    description: "Cubrimos la mayoria de ciudades con una entrega rapida y segura.",
  },
  {
    num: "03",
    title: "Soporte Técnico",
    description: "Equipo post-venta especializado disponible cuando lo necesites. Tu satisfacción es nuestra prioridad.",
  },
];

export default function WhyInnarino() {
  return (
    <section className="py-32 px-6 lg:px-10 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Top red line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #E3000B 40%, #E3000B 60%, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="pill-label mb-4 block">Nuestra propuesta</span>
            <h2
              className="text-white font-bold leading-none"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", letterSpacing: "-0.02em" }}
            >
              ¿Por qué{" "}
              <span style={{ color: "#E3000B" }}>iNariño</span>?
            </h2>
          </div>
          <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">
            La experiencia Apple completa, disponible en tu región.
          </p>
        </motion.div>

        {/* ── 3 columns ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="relative p-10 group"
              style={{ borderRight: i < reasons.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
            >
              {/* Hover red top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: "#E3000B" }}
              />

              {/* Number */}
              <p
                className="text-6xl font-bold mb-8 leading-none"
                style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.05)" }}
              >
                {r.num}
              </p>

              <h3
                className="text-white text-xl font-bold mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {r.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{r.description}</p>

              {/* Bottom red accent */}
              <div
                className="mt-10 w-8 h-0.5"
                style={{ background: "#E3000B" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
