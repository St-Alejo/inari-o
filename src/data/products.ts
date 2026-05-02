export type ProductImage = string;
export type ProductSpecs = Record<string, string>;
export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  storage?: string;
  ram?: string;
};
export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  images: ProductImage[];
};

export type ProductCondition = "nuevo" | "refurbished";
export type ProductGrade = "A" | "B" | "C";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: "Apple";
  category: "iphone" | "watch" | "accessory" | "ipad";
  condition: ProductCondition;
  grade?: ProductGrade;
  description: string;
  badge?: string | null;
  colors?: ProductColor[];
  variants?: ProductVariant[];
  basePrice: number;
  originalPrice?: number;
  stock: number;
  specs: ProductSpecs;
  defaultImages: ProductImage[];
  releaseYear: number;
  compareGroup?: string;
  storage?: string;
  ram?: string;
};

/* ──────────────────────────────────────────────
   PRODUCTOS NUEVOS
────────────────────────────────────────────── */
export const products: Product[] = [
  // ── iPhones nuevos ──────────────────────────
  {
    id: "iphone-15-pro-max",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "iphone",
    condition: "nuevo",
    description:
      "El iPhone más avanzado con estructura de titanio aeroespacial. Chip A17 Pro, cámara de 48 MP, lente teleobjetivo 5x y el nuevo botón de acción.",
    badge: "MÁS VENDIDO",
    basePrice: 5199000,
    stock: 8,
    releaseYear: 2023,
    compareGroup: "iphone-15-family",
    storage: "256 GB",
    specs: {
      Pantalla: "6.7 pulgadas Super Retina XDR OLED",
      Chip: "A17 Pro",
      "Cámara principal": "48 MP, apertura f/1.78",
      "Ultra gran angular": "12 MP, apertura f/2.2",
      Teleobjetivo: "12 MP, 5x óptico",
      Material: "Titanio aeroespacial",
      Conectividad: "USB-C, 5G",
      Batería: "Hasta 29 horas reproducción video",
    },
    defaultImages: ["/iphone-15-pro-max.png"],
    variants: [
      { id: "256gb", name: "256 GB", price: 5199000, storage: "256 GB" },
      { id: "512gb", name: "512 GB", price: 6199000, storage: "512 GB" },
      { id: "1tb", name: "1 TB", price: 7199000, storage: "1 TB" },
    ],
    colors: [
      { id: "black-titanium",   name: "Titanio Negro",   hex: "#464644", images: ["/iphone-15-pro-max.png"] },
      { id: "natural-titanium", name: "Titanio Natural", hex: "#b4b2ac", images: ["/iphone-15-pro-max.png"] },
      { id: "white-titanium",   name: "Titanio Blanco",  hex: "#e2e3e4", images: ["/iphone-15-pro-max.png"] },
      { id: "blue-titanium",    name: "Titanio Azul",    hex: "#354354", images: ["/iphone-15-pro-max.png"] },
    ],
  },
  {
    id: "iphone-15-pro",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "iphone",
    condition: "nuevo",
    description:
      "Diseño robusto y ligero de titanio aeroespacial. Chip A17 Pro, cámara principal de 48 MP súper potente y botón de acción personalizable.",
    basePrice: 4299000,
    stock: 5,
    releaseYear: 2023,
    compareGroup: "iphone-15-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A17 Pro",
      "Cámara principal": "48 MP, apertura f/1.78",
      Teleobjetivo: "12 MP, 3x óptico",
      Material: "Titanio aeroespacial",
      Conectividad: "USB-C, 5G",
      Batería: "Hasta 23 horas reproducción video",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=940&hei=1112&fmt=png-alpha&.v=1692937780973",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 4299000, storage: "128 GB" },
      { id: "256gb", name: "256 GB", price: 4799000, storage: "256 GB" },
      { id: "512gb", name: "512 GB", price: 5799000, storage: "512 GB" },
    ],
    colors: [
      {
        id: "black-titanium",
        name: "Titanio Negro",
        hex: "#464644",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=940&hei=1112&fmt=png-alpha&.v=1692937780973",
        ],
      },
    ],
  },
  {
    id: "iphone-15",
    slug: "iphone-15",
    name: "iPhone 15",
    brand: "Apple",
    category: "iphone",
    condition: "nuevo",
    description:
      "La Dynamic Island te muestra alertas y Actividades en Vivo. Diseño innovador con vidrio tintado en toda la masa.",
    basePrice: 3499000,
    stock: 10,
    releaseYear: 2023,
    compareGroup: "iphone-15-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A16 Bionic",
      "Cámara principal": "48 MP, apertura f/1.6",
      "Ultra gran angular": "12 MP, apertura f/2.4",
      Material: "Aluminio con vidrio tintado",
      Conectividad: "USB-C, 5G",
      Batería: "Hasta 20 horas reproducción video",
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=940&hei=1112&fmt=png-alpha&.v=1692922085012"],
    variants: [
      { id: "128gb", name: "128 GB", price: 3499000, storage: "128 GB" },
      { id: "256gb", name: "256 GB", price: 3999000, storage: "256 GB" },
    ],
    colors: [
      {
        id: "pink",
        name: "Rosa",
        hex: "#faddd7",
        images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=940&hei=1112&fmt=png-alpha&.v=1692922085012"],
      },
      {
        id: "black",
        name: "Negro",
        hex: "#35393b",
        images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=940&hei=1112&fmt=png-alpha&.v=1692922083995"],
      },
    ],
  },
  {
    id: "iphone-14",
    slug: "iphone-14",
    name: "iPhone 14",
    brand: "Apple",
    category: "iphone",
    condition: "nuevo",
    description:
      "Batería para todo el día y una pantalla impresionante. Cámara frontal TrueDepth con enfoque automático.",
    basePrice: 2799000,
    stock: 7,
    releaseYear: 2022,
    compareGroup: "iphone-14-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      "Cámara principal": "12 MP, apertura f/1.5",
      "Ultra gran angular": "12 MP, apertura f/2.4",
      Conectividad: "Lightning, 5G",
      Batería: "Hasta 20 horas reproducción video",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=940&hei=1112&fmt=png-alpha&.v=1660803972362",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 2799000, storage: "128 GB" },
      { id: "256gb", name: "256 GB", price: 3299000, storage: "256 GB" },
    ],
    colors: [
      {
        id: "midnight",
        name: "Medianoche",
        hex: "#171e27",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=940&hei=1112&fmt=png-alpha&.v=1660803972362",
        ],
      },
    ],
  },
  {
    id: "iphone-13",
    slug: "iphone-13",
    name: "iPhone 13",
    brand: "Apple",
    category: "iphone",
    condition: "nuevo",
    badge: "MEJOR PRECIO",
    description:
      "Super potente. Super resistente. Sistema de dos cámaras muy avanzado con modo Cine.",
    basePrice: 1999000,
    stock: 3,
    releaseYear: 2021,
    compareGroup: "iphone-13-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      "Cámara principal": "12 MP, apertura f/1.6",
      "Ultra gran angular": "12 MP, apertura f/2.4",
      Conectividad: "Lightning, 5G",
      Batería: "Hasta 19 horas reproducción video",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 1999000, storage: "128 GB" },
    ],
    colors: [
      {
        id: "midnight",
        name: "Medianoche",
        hex: "#171e27",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000",
        ],
      },
    ],
  },
  // ── Apple Watch ──────────────────────────────
  {
    id: "apple-watch-series-9",
    slug: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "watch",
    condition: "nuevo",
    description:
      "El Apple Watch más potente hasta ahora. Con el chip S9, una pantalla el doble de brillante y el nuevo gesto de doble toque.",
    basePrice: 1899000,
    stock: 4,
    releaseYear: 2023,
    specs: {
      Pantalla: "Retina siempre activa, hasta 2000 nits",
      Chip: "S9 SiP",
      Sensores: "Oxígeno en sangre, ECG, temperatura cutánea",
      "Duración batería": "Hasta 18 horas · 36h ahorro batería",
      Conectividad: "GPS, Bluetooth 5.3, Wi-Fi, NFC",
    },
    defaultImages: ["/apple-watch-s9.jpg"],
    variants: [
      { id: "41mm", name: "41 mm", price: 1899000 },
      { id: "45mm", name: "45 mm", price: 2099000 },
    ],
  },
  // ── Accesorios ───────────────────────────────
  {
    id: "airpods-pro-2",
    slug: "airpods-pro-2",
    name: "AirPods Pro (2da gen)",
    brand: "Apple",
    category: "accessory",
    condition: "nuevo",
    description:
      "Cancelación Activa de Ruido hasta 2 veces mejor, Audio Espacial personalizado y estuche MagSafe con USB-C.",
    basePrice: 899000,
    stock: 9,
    releaseYear: 2023,
    specs: {
      Conectividad: "Bluetooth 5.3, USB-C",
      Batería: "6h audio CAN, 30h con estuche",
      "Cancelación de ruido": "Activa hasta 2× mejor que 1ra gen",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=940&hei=1112&fmt=png-alpha&.v=1660803972380",
    ],
  },
  {
    id: "airpods-3",
    slug: "airpods-3",
    name: "AirPods (3ra gen)",
    brand: "Apple",
    category: "accessory",
    condition: "nuevo",
    description:
      "Audio Espacial con seguimiento dinámico y mayor duración de batería. Resistencia al agua IPX4.",
    basePrice: 649000,
    stock: 12,
    releaseYear: 2022,
    specs: {
      Conectividad: "Lightning",
      Batería: "6h audio, 30h con estuche",
      Resistencia: "Sweat & water (IPX4)",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=940&hei=1112&fmt=png-alpha&.v=1632861342000",
    ],
  },
  {
    id: "funda-silicona-iphone-15-pro",
    slug: "funda-silicona-iphone-15-pro",
    name: "Funda de Silicón MagSafe – iPhone 15 Pro",
    brand: "Apple",
    category: "accessory",
    condition: "nuevo",
    description:
      "Suave al tacto, con forro de microfibra y compatibilidad MagSafe. Diseñada por Apple.",
    basePrice: 189000,
    stock: 15,
    releaseYear: 2023,
    specs: {
      Material: "Silicón con forro de microfibra",
      Compatibilidad: "iPhone 15 Pro, MagSafe",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT0V3?wid=940&hei=1112&fmt=png-alpha&.v=1694014871437",
    ],
  },
  {
    id: "apple-watch-band-sport",
    slug: "apple-watch-band-sport",
    name: "Correa Deportiva Apple Watch",
    brand: "Apple",
    category: "accessory",
    condition: "nuevo",
    description:
      "Fluoroelastómero de alto rendimiento. Duradera, resistente al sudor y sorprendentemente suave.",
    basePrice: 149000,
    stock: 20,
    releaseYear: 2022,
    specs: {
      Material: "Fluoroelastómero",
      Compatibilidad: "Apple Watch 41mm y 45mm",
    },
    defaultImages: ["/correa-sport.jpg"],
  },
  {
    id: "magsafe-charger",
    slug: "magsafe-charger",
    name: "Cargador MagSafe",
    brand: "Apple",
    category: "accessory",
    condition: "nuevo",
    description:
      "Se adhiere magnéticamente a la parte posterior de tu iPhone. Carga inalámbrica rápida hasta 15W.",
    basePrice: 249000,
    stock: 18,
    releaseYear: 2022,
    specs: {
      Conector: "USB-C",
      "Carga max": "15W inalámbrica",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=940&hei=1112&fmt=png-alpha&.v=1604021986000",
    ],
  },

  /* ──────────────────────────────────────────────
     REFURBISHED — iPhone 14
  ────────────────────────────────────────────── */
  {
    id: "iphone-14-ref-a",
    slug: "iphone-14-refurbished-grado-a",
    name: "iPhone 14 Reacondicionado · Grado A",
    brand: "Apple",
    category: "iphone",
    condition: "refurbished",
    grade: "A",
    badge: "REACONDICIONADO",
    description:
      "iPhone 14 en excelente estado estético y funcional. Sin rayones visibles. Batería ≥ 85%. Con cable y garantía Inariño 6 meses.",
    basePrice: 1999000,
    originalPrice: 2799000,
    stock: 3,
    releaseYear: 2022,
    compareGroup: "iphone-14-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      Conectividad: "Lightning, 5G",
      "Estado estético": "Sin rayones. Posibles micro-marcas invisibles.",
      "Salud batería": "≥ 85%",
      Incluye: "Cable USB-C, guía rápida. Sin caja original.",
      Garantía: "6 meses Inariño",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=940&hei=1112&fmt=png-alpha&.v=1660803972362",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 1999000, storage: "128 GB" },
    ],
  },
  {
    id: "iphone-14-ref-b",
    slug: "iphone-14-refurbished-grado-b",
    name: "iPhone 14 Reacondicionado · Grado B",
    brand: "Apple",
    category: "iphone",
    condition: "refurbished",
    grade: "B",
    badge: "REACONDICIONADO",
    description:
      "iPhone 14 funcional con signos leves de uso. Batería ≥ 80%. Ideal si el precio importa más que la estética.",
    basePrice: 1649000,
    originalPrice: 2799000,
    stock: 2,
    releaseYear: 2022,
    compareGroup: "iphone-14-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      Conectividad: "Lightning, 5G",
      "Estado estético": "Rayones leves visibles con luz directa.",
      "Salud batería": "≥ 80%",
      Incluye: "Cable USB-C, guía rápida. Sin caja original.",
      Garantía: "6 meses Inariño",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=940&hei=1112&fmt=png-alpha&.v=1660803972362",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 1649000, storage: "128 GB" },
    ],
  },

  /* ── Refurbished — iPhone 13 ── */
  {
    id: "iphone-13-ref-a",
    slug: "iphone-13-refurbished-grado-a",
    name: "iPhone 13 Reacondicionado · Grado A",
    brand: "Apple",
    category: "iphone",
    condition: "refurbished",
    grade: "A",
    badge: "REACONDICIONADO",
    description:
      "iPhone 13 en estado casi nuevo. Sin rayones visibles a simple vista. Batería ≥ 87%. Con garantía Inariño 6 meses.",
    basePrice: 1399000,
    originalPrice: 1999000,
    stock: 4,
    releaseYear: 2021,
    compareGroup: "iphone-13-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      Conectividad: "Lightning, 5G",
      "Estado estético": "Sin rayones visibles. Posibles marcas mínimas en bordes.",
      "Salud batería": "≥ 87%",
      Incluye: "Cable Lightning, guía rápida. Sin caja original.",
      Garantía: "6 meses Inariño",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 1399000, storage: "128 GB" },
    ],
  },
  {
    id: "iphone-13-ref-b",
    slug: "iphone-13-refurbished-grado-b",
    name: "iPhone 13 Reacondicionado · Grado B",
    brand: "Apple",
    category: "iphone",
    condition: "refurbished",
    grade: "B",
    badge: "REACONDICIONADO",
    description:
      "iPhone 13 completamente funcional con marcas leves de uso. Batería ≥ 80%. Excelente relación precio-rendimiento.",
    basePrice: 1149000,
    originalPrice: 1999000,
    stock: 5,
    releaseYear: 2021,
    compareGroup: "iphone-13-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      Conectividad: "Lightning, 5G",
      "Estado estético": "Rayones leves en la parte trasera.",
      "Salud batería": "≥ 80%",
      Incluye: "Cable Lightning, guía rápida. Sin caja original.",
      Garantía: "6 meses Inariño",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 1149000, storage: "128 GB" },
    ],
  },
  {
    id: "iphone-13-ref-c",
    slug: "iphone-13-refurbished-grado-c",
    name: "iPhone 13 Reacondicionado · Grado C",
    brand: "Apple",
    category: "iphone",
    condition: "refurbished",
    grade: "C",
    badge: "REACONDICIONADO",
    description:
      "iPhone 13 funcional al 100%. Marcas de uso notables pero no afectan la pantalla. Batería ≥ 75%. Precio mínimo garantizado.",
    basePrice: 899000,
    originalPrice: 1999000,
    stock: 6,
    releaseYear: 2021,
    compareGroup: "iphone-13-family",
    storage: "128 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A15 Bionic",
      Conectividad: "Lightning, 5G",
      "Estado estético": "Marcas de uso visibles en cuerpo y bordes. Pantalla sin rayones.",
      "Salud batería": "≥ 75%",
      Incluye: "Cable Lightning. Sin caja original.",
      Garantía: "6 meses Inariño",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000",
    ],
    variants: [
      { id: "128gb", name: "128 GB", price: 899000, storage: "128 GB" },
    ],
  },

  /* ── Refurbished — iPhone 12 ── */
  {
    id: "iphone-12-ref-a",
    slug: "iphone-12-refurbished-grado-a",
    name: "iPhone 12 Reacondicionado · Grado A",
    brand: "Apple",
    category: "iphone",
    condition: "refurbished",
    grade: "A",
    badge: "REACONDICIONADO",
    description:
      "iPhone 12 en estado casi nuevo. Batería ≥ 85%. La opción más económica con 5G y pantalla OLED.",
    basePrice: 899000,
    originalPrice: 1599000,
    stock: 7,
    releaseYear: 2020,
    storage: "64 GB",
    specs: {
      Pantalla: "6.1 pulgadas Super Retina XDR OLED",
      Chip: "A14 Bionic",
      Conectividad: "Lightning, 5G",
      "Estado estético": "Sin rayones visibles.",
      "Salud batería": "≥ 85%",
      Incluye: "Cable Lightning. Sin caja original.",
      Garantía: "6 meses Inariño",
    },
    defaultImages: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604021989000",
    ],
    variants: [
      { id: "64gb", name: "64 GB", price: 899000, storage: "64 GB" },
      { id: "128gb", name: "128 GB", price: 999000, storage: "128 GB" },
    ],
  },
];

/* ── Helpers ─────────────────────────────────── */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.condition === "nuevo");
}

export function getRefurbishedProducts(): Product[] {
  return products.filter((p) => p.condition === "refurbished");
}
