export const siteConfig = {
  name: "Inariño",
  legalName: "Inariño S.A.S.",
  description:
    "Distribuidor autorizado de productos Apple en Nariño, Colombia. iPhones, AirPods, Apple Watch, accesorios y más con garantía oficial y envío a todo el país.",
  shortDescription: "Apple original con garantía, en Pasto y todo Nariño.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inariño.com",
  ogImage: "/opengraph-image",
  locale: "es_CO",
  region: "CO-NAR",
  city: "Pasto",
  country: "Colombia",
  address:
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ??
    "Calle 18 #25-30, Pasto, Nariño, Colombia",
  nit: process.env.NEXT_PUBLIC_BUSINESS_NIT ?? "900.000.000-0",
  phone: "+57 318 000 0000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573180000000",
  email: "hola@inariño.com",
  schedule: "Lun – Sáb · 9:00 a 19:00",
  founded: "2019",
  social: {
    instagram: "https://instagram.com/inariño",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573180000000"}`,
    facebook: "https://facebook.com/inariño",
    tiktok: "https://tiktok.com/@inariño",
  },
  cities: [
    "Pasto",
    "Ipiales",
    "Tumaco",
    "Túquerres",
    "La Unión",
    "Sandoná",
    "Samaniego",
  ],
  brand: {
    primary: "#E3000B",
    surface: "#101010",
    background: "#080808",
  },
  freeShippingThreshold: 800_000,
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
