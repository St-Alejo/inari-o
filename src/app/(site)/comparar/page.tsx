import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "Comparar productos",
  path: "/comparar",
  noIndex: true,
});

export default function CompararPage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  const ids = (searchParams.ids ?? "").split(",").filter(Boolean).slice(0, 3);
  const items = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Comparador" title="Compara productos" />
        <div className="max-w-3xl mx-auto px-6 lg:px-10 pb-32 flex flex-col items-center gap-6 py-16 text-zinc-500">
          <p>Agrega productos al comparador desde el catálogo.</p>
          <Link href="/catalogo" className="btn-primary text-sm">
            Ir al catálogo
          </Link>
        </div>
      </>
    );
  }

  const allSpecKeys = Array.from(
    new Set(items.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <>
      <PageHeader eyebrow="Comparador" title={`Comparando ${items.length} productos`} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32 overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          {/* Header row */}
          <thead>
            <tr>
              <th className="text-left pb-6 pr-6 text-zinc-500 font-normal text-xs uppercase tracking-widest w-36">
                Producto
              </th>
              {items.map((p) => (
                <th key={p.id} className="pb-6 px-4 text-center align-top">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-xl bg-[#0d0d0d] border flex items-center justify-center p-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                      <Image src={p.defaultImages[0]} alt={p.name} width={72} height={72} className="object-contain" />
                    </div>
                    <Link href={`/product/${p.slug}`} className="font-bold text-sm text-center hover:text-[#E3000B] transition-colors leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {p.name}
                    </Link>
                    <span className="text-[#E3000B] font-bold text-base" style={{ fontFamily: "'Syne', sans-serif" }}>
                      ${p.basePrice.toLocaleString("es-CO")}
                    </span>
                    <Link href={`/product/${p.slug}`} className="btn-primary text-xs py-2 px-4 w-full justify-center">
                      Ver producto
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Condition row */}
            <tr className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <td className="py-4 pr-6 text-xs uppercase tracking-widest text-zinc-500 font-semibold">Condición</td>
              {items.map((p) => (
                <td key={p.id} className="py-4 px-4 text-center text-zinc-300">
                  {p.condition === "nuevo" ? "Nuevo" : `Refurbished Grado ${p.grade ?? ""}`}
                </td>
              ))}
            </tr>

            {/* Specs rows */}
            {allSpecKeys.map((key) => {
              const vals = items.map((p) => p.specs[key] ?? "—");
              const allSame = vals.every((v) => v === vals[0]);
              return (
                <tr key={key} className="border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <td className="py-4 pr-6 text-xs uppercase tracking-widest text-zinc-500 font-semibold">{key}</td>
                  {vals.map((v, i) => (
                    <td
                      key={i}
                      className={`py-4 px-4 text-center text-sm ${!allSame && v !== "—" ? "text-white" : "text-zinc-400"}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Stock row */}
            <tr className="border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <td className="py-4 pr-6 text-xs uppercase tracking-widest text-zinc-500 font-semibold">Stock</td>
              {items.map((p) => (
                <td key={p.id} className="py-4 px-4 text-center text-sm">
                  <span className={p.stock > 0 ? "text-emerald-400" : "text-red-400"}>
                    {p.stock > 0 ? `${p.stock} unidades` : "Agotado"}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
