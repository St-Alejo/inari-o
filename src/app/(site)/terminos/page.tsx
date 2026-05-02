import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso del sitio web y servicios de Inariño.",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Marco legal"
        title="Términos y condiciones"
        description={`Última actualización: ${new Date().getFullYear()}`}
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-10 pb-32 text-zinc-300 leading-relaxed space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            1. Identificación
          </h2>
          <p>
            Este sitio es operado por {siteConfig.legalName}, NIT {siteConfig.nit},
            con domicilio en {siteConfig.address}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            2. Aceptación
          </h2>
          <p>
            Al usar este sitio o realizar una compra, usted acepta estos términos y
            las políticas de privacidad y devoluciones aquí publicadas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            3. Productos y precios
          </h2>
          <p>
            Los precios están expresados en pesos colombianos (COP) e incluyen IVA.
            Inariño se reserva el derecho a corregir errores tipográficos evidentes
            y a actualizar precios sin previo aviso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            4. Pago
          </h2>
          <p>
            Aceptamos PSE, Nequi y tarjetas crédito/débito a través de la pasarela
            Wompi. Inariño no almacena información financiera del cliente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            5. Garantía y devoluciones
          </h2>
          <p>
            Aplican las políticas publicadas en las páginas de Garantía y
            Devoluciones, conforme a la Ley 1480 de 2011 y normativa vigente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            6. Limitación de responsabilidad
          </h2>
          <p>
            Inariño responde por los productos vendidos según ley colombiana. No
            asumimos responsabilidad por daños indirectos ni por interrupciones
            ajenas (proveedores de internet, transporte, pasarelas de pago).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            7. Ley aplicable
          </h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia.
            Cualquier disputa se someterá a los jueces competentes de la ciudad de Pasto.
          </p>
        </section>
      </article>
    </>
  );
}
