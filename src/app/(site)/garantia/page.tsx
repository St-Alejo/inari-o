import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Garantía",
  description:
    "Todos los productos Apple vendidos por Inariño cuentan con garantía oficial de fábrica conforme a la Ley 1480 de 2011 (Estatuto del Consumidor) en Colombia.",
  path: "/garantia",
});

export default function GarantiaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compra protegida"
        title="Garantía oficial Apple"
        description="Cumplimos lo que dice la ley colombiana. Cada equipo tiene mínimo 1 año de garantía de fábrica."
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-10 pb-32 prose prose-invert prose-zinc">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Cobertura
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Todos los productos nuevos vendidos por Inariño cuentan con la garantía
            oficial Apple por <strong>12 meses</strong> contados desde la fecha de
            compra, conforme al Estatuto del Consumidor colombiano (Ley 1480 de 2011)
            y la Ley 2439 de 2024.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Productos refurbished
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Los productos reacondicionados (grados A, B y C) cuentan con
            <strong> 6 meses de garantía Inariño</strong> que cubren defectos de
            funcionamiento. No se cubre desgaste estético propio de cada grado.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Qué cubre
          </h2>
          <ul className="text-zinc-300 leading-relaxed list-disc pl-5 space-y-1">
            <li>Defectos de fábrica en componentes internos</li>
            <li>Fallas de software no atribuibles al usuario</li>
            <li>Mal funcionamiento de batería bajo uso normal</li>
            <li>Defectos en accesorios incluidos en la caja</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Qué no cubre
          </h2>
          <ul className="text-zinc-300 leading-relaxed list-disc pl-5 space-y-1">
            <li>Daños por caída, golpe o líquidos</li>
            <li>Modificaciones, jailbreak o instalación de software no oficial</li>
            <li>Uso indebido o mantenimiento no autorizado</li>
            <li>Pérdida o robo del equipo</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Cómo aplicar
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Escríbanos por WhatsApp con su factura y describa la falla. Le indicamos
            si la atención se hace en nuestro punto de Pasto o si remitimos al centro
            de servicio Apple autorizado más cercano.
          </p>
        </section>
      </article>
    </>
  );
}
