import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import CatalogClient from "./CatalogClient";
import StoreGuide from "@/components/StoreGuide";

export const metadata: Metadata = buildMetadata({
  title: "Catálogo",
  description:
    "Explora toda la tienda Inariño: iPhones nuevos y reacondicionados, Apple Watch, AirPods y accesorios. Filtra por precio, condición, almacenamiento y más.",
  path: "/catalogo",
});

export default function CatalogoPage({
  searchParams,
}: {
  searchParams: { q?: string; cond?: string };
}) {
  return (
    <>
      <StoreGuide />
      <PageHeader eyebrow="Nuestra tienda" title="Catálogo" />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <CatalogClient
          initialQ={searchParams.q}
          initialCondition={
            searchParams.cond === "refurbished" || searchParams.cond === "nuevo"
              ? searchParams.cond
              : undefined
          }
        />
      </section>
    </>
  );
}
