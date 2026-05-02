import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Devoluciones",
  description:
    "Tiene 5 días hábiles para retractarse de su compra en Inariño, conforme a la Ley 1480 de 2011 de Colombia.",
  path: "/devoluciones",
});

export default function DevolucionesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tranquilidad total"
        title="Devoluciones y retracto"
        description="La ley colombiana le da 5 días hábiles para devolver lo que compró por Internet sin tener que justificar el motivo."
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-10 pb-32">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Derecho de retracto
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Conforme al artículo 47 de la Ley 1480 de 2011, usted tiene
            <strong> 5 días hábiles </strong> contados desde la entrega del producto
            para retractarse de su compra realizada por la web. Le devolvemos el
            100% del dinero dentro de los 30 días calendario siguientes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Condiciones
          </h2>
          <ul className="text-zinc-300 leading-relaxed list-disc pl-5 space-y-1">
            <li>El producto debe estar sellado o en idéntico estado al recibido</li>
            <li>Debe incluir todos los accesorios y empaques originales</li>
            <li>No aplica a productos personalizados ni servicios digitales activados</li>
            <li>El costo del envío de devolución corre por cuenta del cliente</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Cómo solicitar
          </h2>
          <ol className="text-zinc-300 leading-relaxed list-decimal pl-5 space-y-1">
            <li>Escríbanos a soporte por WhatsApp con su número de pedido</li>
            <li>Le enviamos la guía y la dirección para la devolución</li>
            <li>Una vez recibido y verificado, procesamos el reembolso</li>
            <li>El dinero llega al mismo medio de pago en máximo 30 días</li>
          </ol>
        </section>
      </article>
    </>
  );
}
