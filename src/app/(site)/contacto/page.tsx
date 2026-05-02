import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Hable con Inariño por WhatsApp, llamada o correo. Tienda física en Pasto y atención de lunes a sábado.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Estamos para servirle"
        title="Contáctenos"
        description="Resolvemos sus dudas sobre productos, precios, disponibilidad y envíos. Respondemos rápido por WhatsApp."
      />

      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href={whatsappLink("Hola, quisiera información sobre un producto.")}
          target="_blank"
          rel="noreferrer"
          className="card-surface rounded-xl p-6 hover:border-[#E3000B]/40 transition-colors block"
        >
          <div className="text-[10px] uppercase tracking-widest text-[#E3000B] mb-2">WhatsApp</div>
          <div className="font-bold text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Chatear ahora
          </div>
          <div className="text-zinc-500 text-sm">{siteConfig.phone}</div>
        </a>

        <a
          href={`tel:${siteConfig.phone}`}
          className="card-surface rounded-xl p-6 hover:border-[#E3000B]/40 transition-colors block"
        >
          <div className="text-[10px] uppercase tracking-widest text-[#E3000B] mb-2">Llamada</div>
          <div className="font-bold text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {siteConfig.phone}
          </div>
          <div className="text-zinc-500 text-sm">{siteConfig.schedule}</div>
        </a>

        <a
          href={`mailto:${siteConfig.email}`}
          className="card-surface rounded-xl p-6 hover:border-[#E3000B]/40 transition-colors block"
        >
          <div className="text-[10px] uppercase tracking-widest text-[#E3000B] mb-2">Correo</div>
          <div className="font-bold text-lg mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {siteConfig.email}
          </div>
          <div className="text-zinc-500 text-sm">Respondemos en menos de 24h</div>
        </a>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-32">
        <div className="card-surface rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
            Tienda física
          </h2>
          <p className="text-zinc-300 mb-1">{siteConfig.address}</p>
          <p className="text-zinc-500 text-sm mb-8">{siteConfig.schedule}</p>
          <div className="aspect-video w-full rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63721.96953928807!2d-77.32127937910156!3d1.2135855000000098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ef81fe27e2cb1%3A0xa6066327e2f9b6b6!2sPasto%2C%20Nari%C3%B1o!5e0!3m2!1ses-419!2sco!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Inariño en Pasto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
