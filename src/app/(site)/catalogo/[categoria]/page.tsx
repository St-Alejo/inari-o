import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getCategoryBySlug } from "@/data/categories";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CatalogClient from "../CatalogClient";
import StoreGuide from "@/components/StoreGuide";

export async function generateMetadata({
  params,
}: {
  params: { categoria: string };
}): Promise<Metadata> {
  const cat = getCategoryBySlug(params.categoria);
  if (!cat) return {};
  return buildMetadata({
    title: cat.label,
    description: `Compra ${cat.label} originales en Inariño. ${cat.description} con garantía oficial y envío a todo Colombia.`,
    path: `/catalogo/${cat.slug}`,
  });
}

export function generateStaticParams() {
  return [
    { categoria: "iphones" },
    { categoria: "watch" },
    { categoria: "accesorios" },
  ];
}

export default function CategoriaPage({
  params,
}: {
  params: { categoria: string };
}) {
  const cat = getCategoryBySlug(params.categoria);
  if (!cat) notFound();

  return (
    <>
      <StoreGuide />
      <PageHeader eyebrow="Catálogo" title={cat.label} description={cat.description} />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <CatalogClient initialCategory={cat.slug} />
      </section>
    </>
  );
}
