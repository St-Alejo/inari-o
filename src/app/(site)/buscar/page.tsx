import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import CatalogClient from "../catalogo/CatalogClient";

export const metadata: Metadata = buildMetadata({
  title: "Buscar productos",
  path: "/buscar",
  noIndex: true,
});

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <>
      <PageHeader
        eyebrow="Resultados"
        title={searchParams.q ? `"${searchParams.q}"` : "Buscar"}
      />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <CatalogClient initialQ={searchParams.q} />
      </section>
    </>
  );
}
