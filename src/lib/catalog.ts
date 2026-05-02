import { products, type Product, type ProductCondition, type ProductGrade } from "@/data/products";

export type CatalogFilters = {
  q?: string;
  category?: string;
  condition?: ProductCondition;
  grade?: ProductGrade[];
  storage?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export type SortOption = "relevance" | "price-asc" | "price-desc" | "newest" | "name";

export type CatalogFacets = {
  conditions: { value: ProductCondition; count: number }[];
  grades: { value: ProductGrade; count: number }[];
  storages: { value: string; count: number }[];
  categories: { value: string; count: number }[];
  priceRange: { min: number; max: number };
};

function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function matchesQuery(product: Product, q: string): boolean {
  if (!q) return true;
  const n = normalizeQuery(q);
  const haystack = normalizeQuery(
    [
      product.name,
      product.description,
      product.category,
      product.condition,
      product.grade ?? "",
      product.storage ?? "",
      ...Object.values(product.specs),
    ].join(" ")
  );
  return n.split(/\s+/).every((token) => haystack.includes(token));
}

export function filterProducts(
  items: Product[],
  filters: CatalogFilters
): Product[] {
  let result = items;

  if (filters.q) result = result.filter((p) => matchesQuery(p, filters.q!));

  if (filters.category && filters.category !== "todos") {
    result = result.filter((p) => {
      const catSlug: Record<string, string> = {
        iphones: "iphone",
        watch: "watch",
        accesorios: "accessory",
        ipad: "ipad",
      };
      return p.category === (catSlug[filters.category!] ?? filters.category);
    });
  }

  if (filters.condition) result = result.filter((p) => p.condition === filters.condition);

  if (filters.grade?.length) {
    result = result.filter((p) => p.grade && filters.grade!.includes(p.grade));
  }

  if (filters.storage?.length) {
    result = result.filter(
      (p) =>
        (p.storage && filters.storage!.includes(p.storage)) ||
        p.variants?.some((v) => v.storage && filters.storage!.includes(v.storage))
    );
  }

  if (filters.minPrice !== undefined)
    result = result.filter((p) => p.basePrice >= filters.minPrice!);

  if (filters.maxPrice !== undefined)
    result = result.filter((p) => p.basePrice <= filters.maxPrice!);

  return result;
}

export function sortProducts(items: Product[], sort: SortOption): Product[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.basePrice - b.basePrice);
    case "price-desc":
      return copy.sort((a, b) => b.basePrice - a.basePrice);
    case "newest":
      return copy.sort((a, b) => b.releaseYear - a.releaseYear);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "es"));
    default:
      return copy;
  }
}

export function getFacets(items: Product[]): CatalogFacets {
  const count = <T extends string>(arr: (T | undefined)[]): { value: T; count: number }[] => {
    const m = new Map<T, number>();
    for (const v of arr) {
      if (v !== undefined) m.set(v, (m.get(v) ?? 0) + 1);
    }
    return Array.from(m.entries()).map(([value, count]) => ({ value, count }));
  };

  const prices = items.map((p) => p.basePrice);

  return {
    conditions: count(items.map((p) => p.condition)),
    grades: count(items.map((p) => p.grade)),
    storages: count(
      items.map((p) => p.storage ?? p.variants?.[0]?.storage)
    ),
    categories: count(items.map((p) => p.category)),
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 10_000_000,
    },
  };
}

export function getCatalog(
  filters: CatalogFilters = {},
  sort: SortOption = "relevance"
): Product[] {
  return sortProducts(filterProducts(products, filters), sort);
}

export function getGlobalPriceRange() {
  const prices = products.map((p) => p.basePrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
