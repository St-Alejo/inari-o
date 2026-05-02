"use client";

import dynamic from "next/dynamic";
import Featured from "@/components/Featured";
import ProductsGrid from "@/components/ProductsGrid";
import Accessories from "@/components/Accessories";
import WhyInariño from "@/components/WhyInariño";
import Testimonials from "@/components/Testimonials";
import Combos from "@/components/Combos";
import Marquee from "@/components/ui/Marquee";
import Skeleton from "@/components/ui/Skeleton";

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div className="w-full min-h-screen bg-[#080808]" />,
});
const WatchShowcase = dynamic(() => import("@/components/WatchShowcase"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[600px]" />,
});

const MARQUEE_ITEMS = [
  "iPhone 15 Pro",
  "Apple Watch Series 9",
  "AirPods Pro",
  "Refurbished Certificado",
  "Distribuidor en Nariño",
  "Garantía Apple",
  "iPhone 15",
  "Apple Watch Ultra",
  "Pago con Wompi",
  "Envío a todo Colombia",
];

export default function Home() {
  return (
    <>
      <section id="inicio">
        <Hero />
      </section>

      <Marquee items={MARQUEE_ITEMS} speed={35} className="py-4 border-y" />

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
      <WhyInariño />
      <Testimonials />
    </>
  );
}
