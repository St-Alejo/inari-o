import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Quiénes somos",
  description:
    "Inariño es distribuidor autorizado Apple en Pasto, Nariño. Conozca nuestra historia, equipo y compromiso con productos originales y servicio cercano.",
  path: "/quienes-somos",
});

const stats = [
  { value: "500+", label: "Clientes satisfechos" },
  { value: "100%", label: "Productos originales" },
  { value: "24h", label: "Entrega en Pasto" },
  { value: `${new Date().getFullYear() - Number(siteConfig.founded)}+`, label: "Años en Nariño" },
];

const values = [
  {
    title: "Originalidad garantizada",
    body: "Solo trabajamos con producto Apple sellado y con factura. Cada equipo se entrega con su garantía oficial respaldada por Inariño.",
  },
  {
    title: "Asesoría real",
    body: "Le explicamos las diferencias reales entre modelos, capacidades y condiciones (nuevo vs. refurbished) para que escoja lo que en verdad necesita.",
  },
  {
    title: "Cercanía local",
    body: "Atendemos personalmente desde nuestra tienda en Pasto y enviamos a Ipiales, Tumaco, Túquerres y todo Nariño con seguimiento.",
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre nosotros"
        title="Una tienda nariñense que entiende de Apple"
        description="Nacimos en Pasto en 2019 con una idea simple: que cualquier persona en Nariño pueda comprar productos Apple originales sin tener que viajar a Bogotá o Cali. Hoy seguimos con la misma promesa."
      />

      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold text-[#E3000B]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ fontFamily: "'Syne', sans-serif" }}>
          Lo que nos define
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={v.title} className="card-surface rounded-xl p-6">
              <div className="text-[10px] uppercase tracking-widest text-[#E3000B] mb-3">0{i + 1}</div>
              <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                {v.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-32">
        <div className="card-surface rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Visítenos en Pasto
          </h2>
          <p className="text-zinc-400 mb-2">{siteConfig.address}</p>
          <p className="text-zinc-500 text-sm">{siteConfig.schedule}</p>
        </div>
      </section>
    </>
  );
}
