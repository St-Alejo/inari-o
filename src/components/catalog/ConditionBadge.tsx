import type { ProductCondition, ProductGrade } from "@/data/products";

const gradeLabel: Record<ProductGrade, string> = {
  A: "Grado A · Excelente",
  B: "Grado B · Bueno",
  C: "Grado C · Aceptable",
};

const gradeColor: Record<ProductGrade, string> = {
  A: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  B: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  C: "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

export default function ConditionBadge({
  condition,
  grade,
  size = "sm",
}: {
  condition: ProductCondition;
  grade?: ProductGrade;
  size?: "sm" | "md";
}) {
  if (condition === "nuevo") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold tracking-widest uppercase ${
          size === "md" ? "text-xs px-3 py-1" : ""
        } text-emerald-400 border-emerald-400/30 bg-emerald-400/10`}
      >
        Nuevo
      </span>
    );
  }

  const g = grade ?? "B";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold tracking-widest uppercase ${
        size === "md" ? "text-xs px-3 py-1" : ""
      } ${gradeColor[g]}`}
    >
      {grade ? gradeLabel[g] : "Reacondicionado"}
    </span>
  );
}
