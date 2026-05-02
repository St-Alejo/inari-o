"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { siteConfig } from "@/lib/site-config";

const productLinks = [
  { label: "iPhones", href: "/catalogo/iphones" },
  { label: "Apple Watch", href: "/catalogo/watch" },
  { label: "AirPods", href: "/catalogo/airpods" },
  { label: "Refurbished", href: "/refurbished" },
  { label: "Combos", href: "/catalogo?combo=true" },
];

const empresaLinks = [
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Contacto", href: "/contacto" },
  { label: "Envíos", href: "/envios" },
  { label: "Garantía", href: "/garantia" },
  { label: "Financiación", href: "/financiacion" },
  { label: "Seguimiento de pedido", href: "/seguimiento" },
];

const legalLinks = [
  { label: "Términos", href: "/terminos" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Devoluciones", href: "/devoluciones" },
];

const social = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "WhatsApp", href: siteConfig.social.whatsapp },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "TikTok", href: siteConfig.social.tiktok },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{ background: "var(--surface)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12">
          <div className="sm:col-span-2 md:col-span-5">
            <div className="mb-6">
              <BrandLogo size="lg" />
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-7">
              Distribuidor autorizado de productos Apple en Nariño, Colombia.
              Originalidad, garantía y atención local.
            </p>

            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E3000B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-zinc-500 text-xs tracking-wide">{siteConfig.address}</span>
            </div>
            <div className="flex items-center gap-2 mb-7">
              <span className="text-zinc-500 text-xs tracking-wide">{siteConfig.schedule}</span>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              {social.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ color: "#ffffff" }}
                  className="text-zinc-500 text-[11px] tracking-widest uppercase transition-colors duration-200"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="hidden md:block md:col-span-1" />

          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
              Tienda
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-zinc-500 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
              Empresa
            </h4>
            <ul className="flex flex-col gap-3">
              {empresaLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-zinc-500 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-bold tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-zinc-500 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm">Suscríbase para enterarse de nuevos productos y ofertas.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-0 w-full md:w-auto max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="su@email.com"
              aria-label="Correo electrónico"
              className="flex-1 px-4 py-3 text-sm text-white outline-none focus:border-[#E3000B] transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRight: "none",
                borderRadius: "3px 0 0 3px",
              }}
            />
            <button className="px-5 py-3 text-xs font-bold tracking-wider uppercase text-white transition-all duration-200 hover:opacity-90" style={{ background: "#E3000B", borderRadius: "0 3px 3px 0" }}>
              OK
            </button>
          </form>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-zinc-600 text-xs">
          © {new Date().getFullYear()} {siteConfig.legalName} · NIT {siteConfig.nit} · Distribuidor autorizado de productos Apple
        </p>
        <div className="flex gap-2 items-center text-xs text-zinc-600">
          <span className="px-2 py-1 rounded bg-white/5">Wompi</span>
          <span className="px-2 py-1 rounded bg-white/5">PSE</span>
          <span className="px-2 py-1 rounded bg-white/5">Nequi</span>
          <span className="px-2 py-1 rounded bg-white/5">VISA</span>
          <span className="px-2 py-1 rounded bg-white/5">MC</span>
        </div>
      </div>
    </footer>
  );
}
