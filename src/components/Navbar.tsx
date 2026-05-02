"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { label: "Tienda", href: "/catalogo" },
  { label: "Refurbished", href: "/refurbished" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Garantía", href: "/garantia" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "nav-glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <BrandLogo size="md" />

          <ul className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium tracking-wide text-zinc-400 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: "#E3000B" }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors text-xs"
              aria-label="Buscar productos"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <span>Buscar</span>
              <span className="ml-2 px-1.5 py-0.5 rounded bg-white/5 text-[10px] tracking-wider">⌘K</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-red-500 transition-colors"
              aria-label={`Abrir carrito (${cartCount} productos)`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center bg-[#E3000B] text-white text-[9px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <Link href="/catalogo" className="hidden lg:flex btn-primary text-xs py-2.5 px-5">
              Ver tienda
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              className="lg:hidden flex flex-col gap-[5px] p-3 relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-white origin-center" />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block w-5 h-px bg-white" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-white origin-center" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden nav-glass border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <ul className="flex flex-col px-6 py-6 gap-5">
                {links.map((link, i) => (
                  <motion.li key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link href={link.href} onClick={() => setMenuOpen(false)} className="text-zinc-300 hover:text-white text-base font-medium block">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <li>
                  <Link href="/catalogo" onClick={() => setMenuOpen(false)} className="btn-primary text-xs py-3 w-full justify-center">
                    Ver tienda
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* CMD+K placeholder modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-[90] w-[92%] max-w-xl card-surface rounded-xl p-2 shadow-2xl"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar productos, marcas, modelos..."
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
                />
                <kbd className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded bg-white/5">ESC</kbd>
              </div>
              <div className="border-t px-4 py-4 text-xs text-zinc-500" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="text-[10px] uppercase tracking-widest mb-2">Sugerencias</div>
                <ul className="flex flex-col gap-1">
                  <li><Link href="/catalogo" onClick={() => setSearchOpen(false)} className="block px-2 py-1.5 rounded hover:bg-white/5 text-zinc-300">Catálogo completo</Link></li>
                  <li><Link href="/refurbished" onClick={() => setSearchOpen(false)} className="block px-2 py-1.5 rounded hover:bg-white/5 text-zinc-300">iPhones reacondicionados</Link></li>
                  <li><Link href="/garantia" onClick={() => setSearchOpen(false)} className="block px-2 py-1.5 rounded hover:bg-white/5 text-zinc-300">Garantía</Link></li>
                  <li><Link href="/contacto" onClick={() => setSearchOpen(false)} className="block px-2 py-1.5 rounded hover:bg-white/5 text-zinc-300">Contacto</Link></li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
