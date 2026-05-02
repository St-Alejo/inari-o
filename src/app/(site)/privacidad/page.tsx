import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Privacidad y Habeas Data",
  description:
    "Política de tratamiento de datos personales de Inariño conforme a la Ley 1581 de 2012 de Colombia.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Habeas Data"
        title="Política de privacidad"
        description="Cómo recolectamos, usamos y protegemos sus datos personales."
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-10 pb-32 text-zinc-300 leading-relaxed space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Responsable del tratamiento
          </h2>
          <p>
            {siteConfig.legalName}, NIT {siteConfig.nit}, con domicilio en{" "}
            {siteConfig.address}, correo {siteConfig.email}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Marco legal
          </h2>
          <p>
            Esta política se rige por la Ley 1581 de 2012, el Decreto 1377 de 2013
            y demás normas concordantes sobre protección de datos personales en
            Colombia.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Datos que recolectamos
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Datos de identificación: nombre, cédula, fecha de nacimiento</li>
            <li>Datos de contacto: dirección, teléfono, correo electrónico</li>
            <li>Datos transaccionales: historial de pedidos y facturación</li>
            <li>Datos de navegación: cookies, IP y métricas anónimas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Finalidades
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Procesar y entregar sus pedidos</li>
            <li>Atender consultas, devoluciones y garantías</li>
            <li>Enviar información comercial cuando usted lo autorice</li>
            <li>Mejorar nuestros productos y servicios</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Sus derechos
          </h2>
          <p>
            Usted puede conocer, actualizar, rectificar y suprimir sus datos, así
            como revocar la autorización en cualquier momento, escribiendo a{" "}
            {siteConfig.email}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Vigencia
          </h2>
          <p>
            Esta política entra en vigencia desde su publicación y se conservan los
            datos por el tiempo necesario para cumplir las finalidades descritas y
            las obligaciones legales.
          </p>
        </section>
      </article>
    </>
  );
}
