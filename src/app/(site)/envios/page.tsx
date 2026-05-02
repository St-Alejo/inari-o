import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Envíos",
  description:
    "Envíos a todo Colombia con seguimiento. Entrega misma tarde en Pasto y 24-72 horas a Nariño y resto del país.",
  path: "/envios",
});

const zones = [
  {
    zone: "Pasto",
    time: "Mismo día / siguiente día hábil",
    cost: "Gratis sobre $200.000",
  },
  {
    zone: "Resto de Nariño (Ipiales, Tumaco, Túquerres, La Unión, Sandoná)",
    time: "24 a 48 horas hábiles",
    cost: "Desde $15.000",
  },
  {
    zone: "Resto de Colombia",
    time: "48 a 72 horas hábiles",
    cost: `Gratis sobre $${siteConfig.freeShippingThreshold.toLocaleString("es-CO")}`,
  },
];

export default function EnviosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Logística"
        title="Envíos a todo Colombia"
        description="Despachamos desde Pasto con transportadoras aliadas. Le compartimos guía y seguimiento por WhatsApp."
      />

      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-20">
        <div className="card-surface rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-xs uppercase tracking-widest text-zinc-500" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <th className="px-6 py-4 font-semibold">Zona</th>
                <th className="px-6 py-4 font-semibold">Tiempo</th>
                <th className="px-6 py-4 font-semibold">Costo</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z) => (
                <tr key={z.zone} className="border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <td className="px-6 py-5 text-sm">{z.zone}</td>
                  <td className="px-6 py-5 text-sm text-zinc-300">{z.time}</td>
                  <td className="px-6 py-5 text-sm text-[#E3000B] font-semibold">{z.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-32">
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Recoja en tienda
        </h2>
        <p className="text-zinc-400 leading-relaxed mb-2">
          Si está en Pasto puede recoger su pedido directamente en nuestra tienda
          dentro de las 2 horas siguientes a la confirmación de pago, en horario de
          atención.
        </p>
        <p className="text-zinc-500 text-sm">{siteConfig.address}</p>
      </section>
    </>
  );
}
