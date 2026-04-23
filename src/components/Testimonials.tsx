"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Camila Torres",
    city: "Pasto, Nariño",
    avatar: "https://i.pravatar.cc/150?img=47",
    stars: 5,
    text: "Increíble experiencia comprando mi iPhone 15 Pro. El producto llegó perfectamente sellado, con todos sus accesorios y garantía. 100% recomendados.",
  },
  {
    name: "Andrés Muñoz",
    city: "Ipiales, Nariño",
    avatar: "https://i.pravatar.cc/150?img=12",
    stars: 5,
    text: "Compré los AirPods Pro y quedé maravillado con la calidad. El envío llegó en menos de 24h. iNariño es la opción número uno en la región.",
  },
  {
    name: "Valentina Rosero",
    city: "Tumaco, Nariño",
    avatar: "https://i.pravatar.cc/150?img=32",
    stars: 5,
    text: "Por fin una tienda Apple confiable en Nariño. Me ayudaron a elegir el Apple Watch perfecto. ¡Los productos son 100% originales y el soporte es excelente!",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="#E3000B">
          <path d="M8 1L10.06 5.17L14.72 5.84L11.36 9.12L12.12 13.76L8 11.6L3.88 13.76L4.64 9.12L1.28 5.84L5.94 5.17L8 1Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-32 px-6 lg:px-10" style={{ background: "var(--black)" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="pill-label mb-5 justify-center">Reseñas</span>
          <h2
            className="text-white font-bold leading-none"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.6rem)", letterSpacing: "-0.02em" }}
          >
            Lo que dicen nuestros{" "}
            <span style={{ color: "#E3000B" }}>clientes</span>
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-10 flex flex-col gap-6 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.02]"
              style={{
                borderRight: i < testimonials.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              {/* Large quote mark */}
              <span
                className="absolute top-6 right-6 text-7xl font-serif leading-none pointer-events-none select-none"
                style={{ color: "rgba(227,0,11,0.08)", fontFamily: "Georgia, serif" }}
              >
                &quot;
              </span>

              <Stars count={t.stars} />

              <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="36px" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>{t.name}</p>
                  <p className="text-zinc-600 text-xs">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
