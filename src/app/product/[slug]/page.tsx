import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompareProvider } from "@/context/CompareContext";
import ProductClient from "./ProductClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  const condLabel =
    product.condition === "nuevo"
      ? "Nuevo con garantía Apple"
      : `Reacondicionado Grado ${product.grade ?? "A"} · 6 meses garantía`;

  return buildMetadata({
    title: product.name,
    description: `${product.description} ${condLabel}. Disponible en Inariño, Pasto Nariño.`,
    path: `/product/${product.slug}`,
    image: product.defaultImages[0],
  });
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.defaultImages,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "COP",
      price: product.basePrice,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.legalName,
      },
    },
  };

  return (
    <main className="bg-[var(--black)] min-h-screen text-white pt-16">
      <Navbar />
      <CompareProvider>
        <ProductClient product={product} />
      </CompareProvider>
      <Footer />
      <JsonLd data={productJsonLd} />
    </main>
  );
}
