import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Financiación",
  description:
    "Pague su iPhone o Apple Watch en cuotas con Wompi y aliados de crédito. Simulador disponible próximamente.",
  path: "/financiacion",
});

export default function FinanciacionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compre a cuotas"
        title="Financiación"
        description="Trabajamos con pasarelas y aliados de crédito que le permiten diferir su compra hasta en 24 cuotas."
      />

      <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-32">
        <div className="card-surface rounded-2xl p-8 md:p-12 text-center">
          <div className="text-[10px] uppercase tracking-widest text-[#E3000B] mb-3">
            Próximamente
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Simulador de cuotas
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Pronto podrá simular sus cuotas mensuales directamente desde la página
            de cada producto, con tasas calculadas en línea.
          </p>
          <p className="text-zinc-500 text-sm">
            Mientras tanto, escríbanos por WhatsApp y le ayudamos a calcular su
            mejor opción según el método de pago.
          </p>
        </div>
      </section>
    </>
  );
}
