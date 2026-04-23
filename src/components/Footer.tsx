"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{ background: "var(--surface)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* ── Top section ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">

          {/* Brand col */}
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-flex items-center gap-0 mb-6">
              <span
                className="text-3xl font-bold tracking-tighter"
                style={{ fontFamily: "'Syne', sans-serif", color: "#E3000B" }}
              >
                i
              </span>
              <span
                className="text-3xl font-bold tracking-tighter text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Nariño
              </span>
            </a>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-xs mb-8">
              Distribuidor autorizado de productos Apple en Nariño, Colombia. Calidad original. Atención local.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E3000B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="text-zinc-600 text-xs tracking-wide">Pasto, Nariño, Colombia</span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-5">
              {[
                { label: "Instagram", href: "#" },
                { label: "WhatsApp", href: "#" },
                { label: "Facebook", href: "#" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ color: "#ffffff" }}
                  className="text-zinc-600 text-xs tracking-widest uppercase transition-colors duration-200"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="md:col-span-1" />

          {/* Links */}
          <div className="md:col-span-3">
            <h4
              className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Productos
            </h4>
            <ul className="flex flex-col gap-3.5">
              {["iPhones", "Apple Watch", "AirPods", "Fundas", "Cargadores"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4
              className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Empresa
            </h4>
            <ul className="flex flex-col gap-3.5">
              {["Sobre Nosotros", "Garantías", "Envíos", "Soporte", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-sm">Suscríbete para enterarte de nuevos productos y ofertas.</p>
          <div className="flex gap-0 w-full md:w-auto max-w-sm">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 text-sm text-white outline-none"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRight: "none",
                color: "#fff",
                borderRadius: "3px 0 0 3px",
              }}
            />
            <button
              className="px-5 py-3 text-xs font-bold tracking-wider uppercase text-white transition-all duration-200"
              style={{ background: "#E3000B", borderRadius: "0 3px 3px 0" }}
            >
              OK
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-zinc-700 text-xs">
          © 2024 iNariño · Distribuidor autorizado de productos Apple · Nariño, Colombia
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Privacidad</a>
          <a href="#" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  );
}
