import { tool } from "ai";
import { z } from "zod";
import { products, getProductBySlug } from "@/data/products";
import { filterProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

export const chatTools = {
  searchProducts: tool({
    description:
      "Busca productos en el catálogo por consulta libre, categoría, condición o precio máximo. Devuelve lista con slug, nombre, precio y stock.",
    parameters: z.object({
      query: z.string().optional().describe("Texto de búsqueda libre"),
      category: z
        .enum(["iphone", "watch", "accessory", "ipad"])
        .optional()
        .describe("Categoría de producto"),
      condition: z
        .enum(["nuevo", "refurbished"])
        .optional()
        .describe("Condición: nuevo o reacondicionado"),
      maxPrice: z.number().optional().describe("Precio máximo en COP"),
      minPrice: z.number().optional().describe("Precio mínimo en COP"),
    }),
    execute: async ({ query, category, condition, maxPrice, minPrice }) => {
      const results = filterProducts(products, {
        q: query,
        category,
        condition,
        maxPrice,
        minPrice,
      }).slice(0, 6);

      if (results.length === 0) return { found: false, products: [] };

      return {
        found: true,
        products: results.map((p) => ({
          slug: p.slug,
          name: p.name,
          condition: p.condition,
          grade: p.grade ?? null,
          price: p.basePrice,
          originalPrice: p.originalPrice ?? null,
          stock: p.stock,
          image: p.defaultImages[0],
          badge: p.badge ?? null,
        })),
      };
    },
  }),

  getProductDetails: tool({
    description:
      "Obtiene todos los detalles de un producto por su slug: specs, colores, variantes, precio y disponibilidad.",
    parameters: z.object({
      slug: z.string().describe("Slug del producto"),
    }),
    execute: async ({ slug }) => {
      const p = getProductBySlug(slug);
      if (!p) return { found: false };
      return {
        found: true,
        name: p.name,
        description: p.description,
        price: p.basePrice,
        originalPrice: p.originalPrice ?? null,
        condition: p.condition,
        grade: p.grade ?? null,
        stock: p.stock,
        specs: p.specs,
        variants: p.variants ?? [],
        colors: p.colors?.map((c) => ({ name: c.name, hex: c.hex })) ?? [],
        image: p.defaultImages[0],
        releaseYear: p.releaseYear,
      };
    },
  }),

  checkStock: tool({
    description: "Consulta la disponibilidad exacta de un producto.",
    parameters: z.object({
      slug: z.string(),
    }),
    execute: async ({ slug }) => {
      const p = getProductBySlug(slug);
      if (!p) return { found: false };
      return {
        found: true,
        name: p.name,
        stock: p.stock,
        available: p.stock > 0,
        message:
          p.stock === 0
            ? "Agotado por el momento."
            : p.stock <= 2
            ? `Solo ${p.stock} en stock. ¡No espere más!`
            : `Disponible (${p.stock} unidades).`,
      };
    },
  }),

  getCurrentOffers: tool({
    description: "Devuelve los productos con mayor descuento o badge especial.",
    parameters: z.object({}),
    execute: async () => {
      const offers = products
        .filter((p) => p.originalPrice || p.badge)
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          price: p.basePrice,
          originalPrice: p.originalPrice ?? null,
          badge: p.badge ?? null,
          discount: p.originalPrice
            ? Math.round(
                ((p.originalPrice - p.basePrice) / p.originalPrice) * 100
              )
            : 0,
          image: p.defaultImages[0],
        }))
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 4);

      return { offers };
    },
  }),

  addToCart: tool({
    description:
      "Agrega un producto al carrito del cliente. Requiere el slug del producto.",
    parameters: z.object({
      slug: z.string().describe("Slug del producto a agregar"),
      variantId: z.string().optional().describe("ID de la variante (ej: '256gb')"),
      colorId: z.string().optional().describe("ID del color"),
      quantity: z.number().min(1).max(10).default(1),
    }),
    execute: async ({ slug, variantId, colorId, quantity }) => {
      const p = getProductBySlug(slug);
      if (!p) return { success: false, message: "Producto no encontrado." };
      if (p.stock === 0)
        return { success: false, message: "Este producto está agotado." };

      const variant = p.variants?.find((v) => v.id === variantId);
      const color = p.colors?.find((c) => c.id === colorId);
      const price = variant?.price ?? p.basePrice;

      return {
        success: true,
        action: "ADD_TO_CART",
        payload: {
          id: `${p.id}-${variantId ?? "none"}-${colorId ?? "none"}`,
          product: p,
          variant: variant ?? null,
          color: color ?? null,
          quantity,
          price,
        },
        message: `${p.name} agregado al carrito.`,
      };
    },
  }),

  goToCheckout: tool({
    description:
      "Redirige al cliente al checkout para finalizar su compra. Úsalo cuando el cliente diga que quiere pagar o finalizar.",
    parameters: z.object({}),
    execute: async () => ({
      action: "GO_TO_CHECKOUT",
      message: "Perfecto, lo llevo al checkout ahora mismo.",
    }),
  }),

  handoffToHuman: tool({
    description:
      "Genera un link de WhatsApp para pasar al cliente con un asesor humano. Úsalo cuando: el cliente lo pida, no puedas resolver su consulta, o quiera hablar de precios especiales/devoluciones.",
    parameters: z.object({
      reason: z
        .string()
        .describe("Motivo del traspaso: 'precio especial', 'devolución', etc."),
      productSlug: z
        .string()
        .optional()
        .describe("Slug del producto de interés, si aplica"),
    }),
    execute: async ({ reason, productSlug }) => {
      const product = productSlug ? getProductBySlug(productSlug) : null;
      const productText = product ? ` sobre ${product.name}` : "";
      const message = `Hola Inariño, quisiera hablar con un asesor${productText}. Motivo: ${reason}.`;
      const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
      return {
        action: "HANDOFF_WHATSAPP",
        whatsappUrl: url,
        message: "Con gusto le conecto con un asesor por WhatsApp.",
      };
    },
  }),
};
