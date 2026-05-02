import { products } from "@/data/products";

export function buildCatalogContext(): string {
  const lines: string[] = ["## Catálogo actual de productos\n"];

  for (const p of products) {
    const price = `$${p.basePrice.toLocaleString("es-CO")} COP`;
    const original = p.originalPrice
      ? ` (antes $${p.originalPrice.toLocaleString("es-CO")})`
      : "";
    const cond =
      p.condition === "nuevo" ? "Nuevo" : `Reacondicionado Grado ${p.grade ?? "B"}`;
    const stock = p.stock === 0 ? "AGOTADO" : `${p.stock} unidades`;

    lines.push(`### ${p.name}`);
    lines.push(`- slug: ${p.slug}`);
    lines.push(`- Precio: ${price}${original}`);
    lines.push(`- Condición: ${cond}`);
    lines.push(`- Stock: ${stock}`);
    lines.push(`- Categoría: ${p.category}`);
    if (p.storage) lines.push(`- Almacenamiento base: ${p.storage}`);
    if (p.variants?.length) {
      lines.push(
        `- Variantes: ${p.variants.map((v) => `${v.name} → $${v.price.toLocaleString("es-CO")}`).join(", ")}`
      );
    }
    if (p.colors?.length) {
      lines.push(`- Colores: ${p.colors.map((c) => c.name).join(", ")}`);
    }
    const specEntries = Object.entries(p.specs)
      .slice(0, 4)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" · ");
    if (specEntries) lines.push(`- Specs: ${specEntries}`);
    lines.push("");
  }

  return lines.join("\n");
}
