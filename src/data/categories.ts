export type Category = {
  id: string;
  label: string;
  slug: string;
  productCategory: "iphone" | "watch" | "accessory" | "ipad" | null;
  description: string;
};

export const categories: Category[] = [
  {
    id: "all",
    label: "Todo",
    slug: "todos",
    productCategory: null,
    description: "Todos los productos",
  },
  {
    id: "iphone",
    label: "iPhones",
    slug: "iphones",
    productCategory: "iphone",
    description: "iPhone nuevos y reacondicionados",
  },
  {
    id: "watch",
    label: "Apple Watch",
    slug: "watch",
    productCategory: "watch",
    description: "Apple Watch Series 9 y anteriores",
  },
  {
    id: "accessory",
    label: "Accesorios",
    slug: "accesorios",
    productCategory: "accessory",
    description: "AirPods, fundas, correas y cargadores",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
