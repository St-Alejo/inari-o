export type ProductImage = string;
export type ProductSpecs = Record<string, string>;
export type ProductVariant = {
  id: string;
  name: string;
  price: number;
};
export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  images: ProductImage[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "iphone" | "watch" | "accessory";
  description: string;
  badge?: string | null;
  colors?: ProductColor[];
  variants?: ProductVariant[];
  basePrice: number;
  specs: ProductSpecs;
  defaultImages: ProductImage[];
};

export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "iphone",
    description: "El iPhone más avanzado con estructura de titanio aeroespacial. Chip A17 Pro, cámara de 48 MP, lente teleobjetivo 5x y el nuevo botón de acción.",
    badge: "MÁS VENDIDO",
    basePrice: 5199000,
    specs: {
      "Pantalla": "6.7 pulgadas Super Retina XDR OLED",
      "Chip": "A17 Pro",
      "Cámara": "Principal de 48 MP, Ultra gran angular 12 MP, Teleobjetivo 5x",
      "Material": "Titanio con parte posterior de vidrio mate texturizado",
      "Conectividad": "USB-C, 5G"
    },
    defaultImages: ["https://static0.pocketlintimages.com/wordpress/wp-content/uploads/wm/2024/02/iphone-15-pro-max-vs-15-pro-6-copy.jpg"],
    variants: [
      { id: "256gb", name: "256 GB", price: 5199000 },
      { id: "512gb", name: "512 GB", price: 6199000 },
      { id: "1tb", name: "1 TB", price: 7199000 }
    ],
    colors: [
      { id: "black-titanium", name: "Titanio Negro", hex: "#464644", images: ["https://static0.pocketlintimages.com/wordpress/wp-content/uploads/wm/2024/02/iphone-15-pro-max-vs-15-pro-6-copy.jpg"] },
      { id: "natural-titanium", name: "Titanio Natural", hex: "#b4b2ac", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-select?wid=940&hei=1112&fmt=png-alpha&.v=1692898242018"] },
      { id: "white-titanium", name: "Titanio Blanco", hex: "#e2e3e4", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-white-titanium-select?wid=940&hei=1112&fmt=png-alpha&.v=1692898242008"] },
      { id: "blue-titanium", name: "Titanio Azul", hex: "#354354", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-select?wid=940&hei=1112&fmt=png-alpha&.v=1692898242008"] }
    ]
  },
  {
    id: "iphone-15-pro",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "iphone",
    description: "Diseño robusto y ligero de titanio aeroespacial. Chip A17 Pro, cámara principal de 48 MP súper potente y botón de acción personalizable.",
    basePrice: 4299000,
    specs: {
      "Pantalla": "6.1 pulgadas Super Retina XDR OLED",
      "Chip": "A17 Pro",
      "Cámara": "Principal de 48 MP, Ultra gran angular, Teleobjetivo 3x",
      "Material": "Titanio con parte posterior de vidrio mate texturizado",
      "Conectividad": "USB-C, 5G"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=940&hei=1112&fmt=png-alpha&.v=1692937780973"],
    variants: [
      { id: "128gb", name: "128 GB", price: 4299000 },
      { id: "256gb", name: "256 GB", price: 4799000 },
      { id: "512gb", name: "512 GB", price: 5799000 }
    ],
    colors: [
      { id: "black-titanium", name: "Titanio Negro", hex: "#464644", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=940&hei=1112&fmt=png-alpha&.v=1692937780973"] }
    ]
  },
  {
    id: "iphone-15",
    slug: "iphone-15",
    name: "iPhone 15",
    category: "iphone",
    description: "La Dynamic Island te muestra alertas y Actividades en Vivo. Nuevo diseño innovador con vidrio tintado en toda la masa.",
    basePrice: 3499000,
    specs: {
      "Pantalla": "6.1 pulgadas Super Retina XDR OLED",
      "Chip": "A16 Bionic",
      "Cámara": "Avanzado de dos cámaras (Principal de 48 MP)",
      "Material": "Aluminio con parte posterior de vidrio tintado",
      "Conectividad": "USB-C, 5G"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select-202309?wid=940&hei=1112&fmt=png-alpha&.v=1692923780972"],
    variants: [
      { id: "128gb", name: "128 GB", price: 3499000 },
      { id: "256gb", name: "256 GB", price: 3999000 }
    ],
    colors: [
      { id: "pink", name: "Rosa", hex: "#faddd7", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select-202309?wid=940&hei=1112&fmt=png-alpha&.v=1692923780972"] },
      { id: "black", name: "Negro", hex: "#35393b", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select-202309?wid=940&hei=1112&fmt=png-alpha&.v=1692923780971"] }
    ]
  },
  {
    id: "iphone-14",
    slug: "iphone-14",
    name: "iPhone 14",
    category: "iphone",
    description: "Batería para todo el día y una pantalla impresionante. Descubre todo lo que tiene para ofrecerte.",
    basePrice: 2799000,
    specs: {
      "Pantalla": "6.1 pulgadas Super Retina XDR OLED",
      "Chip": "A15 Bionic",
      "Cámara": "Dos cámaras de 12 MP",
      "Conectividad": "Lightning, 5G"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=940&hei=1112&fmt=png-alpha&.v=1660803972362"],
    variants: [
      { id: "128gb", name: "128 GB", price: 2799000 },
      { id: "256gb", name: "256 GB", price: 3299000 }
    ],
    colors: [
      { id: "midnight", name: "Medianoche", hex: "#171e27", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=940&hei=1112&fmt=png-alpha&.v=1660803972362"] }
    ]
  },
  {
    id: "iphone-13",
    slug: "iphone-13",
    name: "iPhone 13",
    category: "iphone",
    badge: "MEJOR PRECIO",
    description: "Super potente. Super resistente. Sistema de dos cámaras muy avanzado.",
    basePrice: 1999000,
    specs: {
      "Pantalla": "6.1 pulgadas Super Retina XDR OLED",
      "Chip": "A15 Bionic",
      "Cámara": "Dos cámaras de 12 MP",
      "Conectividad": "Lightning, 5G"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000"],
    variants: [
      { id: "128gb", name: "128 GB", price: 1999000 }
    ],
    colors: [
      { id: "midnight", name: "Medianoche", hex: "#171e27", images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000"] }
    ]
  },
  {
    id: "apple-watch-series-9",
    slug: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    category: "watch",
    description: "El Apple Watch más potente hasta ahora. Con el chip S9, una pantalla el doble de brillante y el nuevo gesto de doble toque sin tocar la pantalla.",
    basePrice: 1899000,
    specs: {
      "Pantalla": "Pantalla Retina siempre activa hasta 2000 nits",
      "Chip": "S9 SiP",
      "Sensor": "Nivel de oxígeno en la sangre, ECG",
      "Duración": "Hasta 18 horas, 36 en modo Ahorrar Batería"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-alum-midnight-nc-41p3_VW_PF_WF_CO?wid=940&hei=1112&fmt=png-alpha&.v=1693275727038"],
    variants: [
      { id: "41mm", name: "41 mm", price: 1899000 },
      { id: "45mm", name: "45 mm", price: 2099000 }
    ]
  },
  {
    id: "airpods-pro-2",
    slug: "airpods-pro-2",
    name: "AirPods Pro (2da gen)",
    category: "accessory",
    description: "Cancelación Activa de Ruido hasta 2 veces mejor, Audio Espacial personalizado y estuche de carga MagSafe con USB-C.",
    basePrice: 899000,
    specs: {
      "Conectividad": "Bluetooth 5.3, USB-C",
      "Batería": "Hasta 6 horas de audio con Canc. Ruido, 30 horas con estuche"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=940&hei=1112&fmt=png-alpha&.v=1660803972380"]
  },
  {
    id: "funda-silicona-iphone-15-pro",
    slug: "funda-silicona-iphone-15-pro",
    name: "Funda de Silicón con MagSafe para iPhone 15 Pro",
    category: "accessory",
    description: "Diseñada por Apple, suave al tacto y protege tu iPhone.",
    basePrice: 189000,
    specs: {
      "Material": "Silicón con forro interno de microfibra",
      "Compatibilidad": "MagSafe"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT0V3?wid=940&hei=1112&fmt=png-alpha&.v=1694014871437"]
  },
  {
    id: "apple-watch-band-sport",
    slug: "apple-watch-band-sport",
    name: "Correa Deportiva para Apple Watch",
    category: "accessory",
    description: "Hecha de un fluoroelastómero de alto rendimiento, es duradera, resistente y sorprendentemente suave.",
    basePrice: 149000,
    specs: {
      "Material": "Fluoroelastómero",
      "Compatibilidad": "Cajas de 41mm y 45mm"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQDY3?wid=940&hei=1112&fmt=png-alpha&.v=1660803972356"]
  },
  {
    id: "magsafe-charger",
    slug: "magsafe-charger",
    name: "Cargador MagSafe",
    category: "accessory",
    description: "El cargador MagSafe se adhiere magnéticamente a la parte posterior de tu iPhone para una carga inalámbrica rápida de hasta 15W.",
    basePrice: 249000,
    specs: {
      "Conector": "USB-C",
      "Carga": "Inalámbrica rápida (15W)"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=940&hei=1112&fmt=png-alpha&.v=1604021986000"]
  },
  {
    id: "airpods-3",
    slug: "airpods-3",
    name: "AirPods (3ra gen)",
    category: "accessory",
    description: "Audio Espacial con seguimiento dinámico de la cabeza que te envuelve en sonido, y mayor duración de batería.",
    basePrice: 649000,
    specs: {
      "Conectividad": "Lightning",
      "Resistencia": "Sweat and water resistant (IPX4)"
    },
    defaultImages: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=940&hei=1112&fmt=png-alpha&.v=1632861342000"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
