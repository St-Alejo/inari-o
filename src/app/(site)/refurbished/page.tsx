import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import CatalogClient from "../catalogo/CatalogClient";

export const metadata: Metadata = buildMetadata({
  title: "iPhones Reacondicionados",
  description:
    "Compra iPhones reacondicionados con garantía Inariño. Grados A, B y C inspeccionados y probados. Ahorra hasta un 50% vs. precio nuevo.",
  path: "/refurbished",
});

const grades = [
  {
    grade: "A",
    label: "Grado A — Excelente",
    color: "emerald",
    desc: "Sin rayones visibles a simple vista. Batería ≥ 85%. Estado casi nuevo.",
  },
  {
    grade: "B",
    label: "Grado B — Bueno",
    color: "amber",
    desc: "Rayones leves visibles con luz directa. Batería ≥ 80%. Funciona perfecto.",
  },
  {
    grade: "C",
    label: "Grado C — Aceptable",
    color: "orange",
    desc: "Marcas de uso en el cuerpo. Pantalla sin rayones. Batería ≥ 75%. Precio mínimo.",
  },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  amber: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  orange: "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

export default function RefurbishedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reacondicionados certificados"
        title="iPhones Refurbished"
        description="Cada equipo es inspeccionado, probado y clasificado por nuestro equipo técnico antes de la venta. Ahorra hasta 50% con garantía Inariño de 6 meses."
      />

      {/* Grade table */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-16">
        <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Sistema de grados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {grades.map((g) => (
            <div key={g.grade} className={`card-surface rounded-xl p-5 border ${colorMap[g.color]}`}>
              <div className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${colorMap[g.color].split(" ")[0]}`}>
                {g.label}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="card-surface rounded-xl p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <p className="font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
              Garantía en todos los grados
            </p>
            <p className="text-zinc-400 text-sm">6 meses de garantía Inariño que cubre defectos de funcionamiento.</p>
          </div>
          <div className="px-4 py-2 rounded border border-[#E3000B]/40 text-[#E3000B] text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            6 meses garantía
          </div>
        </div>
      </section>

      {/* Catalog filtered to refurbished */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <h2 className="text-xl font-bold mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
          Disponibles ahora
        </h2>
        <CatalogClient initialCondition="refurbished" />
      </section>
    </>
  );
}
