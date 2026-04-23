"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Featured from "@/components/Featured";
import ProductsGrid from "@/components/ProductsGrid";
import Accessories from "@/components/Accessories";
import WhyInnarino from "@/components/WhyInnarino";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Combos from "@/components/Combos";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const WatchShowcase = dynamic(() => import("@/components/WatchShowcase"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <section id="inicio">
        <Hero />
      </section>
      <section id="featured">
        <Featured />
      </section>
      <section id="iphones">
        <ProductsGrid />
      </section>
      <section id="apple-watch">
        <WatchShowcase />
      </section>
      <section id="accesorios">
        <Accessories />
      </section>
      <Combos />
      <WhyInnarino />
      <Testimonials />
      <Footer />
    </main>
  );
}
