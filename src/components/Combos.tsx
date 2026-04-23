"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const combos = [
  {
    id: "combo-pro-max",
    name: "Combo Pro Max Total",
    description: "iPhone 15 Pro Max + Apple Watch S9 + AirPods Pro 2 + Funda. El ecosistema completo con el mejor descuento.",
    items: [
      "iPhone 15 Pro Max",
      "Apple Watch Series 9",
      "AirPods Pro (2da gen)",
      "Funda MagSafe"
    ],
    originalPrice: 8186000,
    comboPrice: 7799000,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-select?wid=400&hei=400&fmt=png-alpha"
    // Just a placeholder image. Ideally, a composition of devices.
  },
  {
    id: "combo-15-basico",
    name: "Ecosistema Inicial",
    description: "iPhone 15 + AirPods (3ra gen) + Cargador MagSafe. Lo esencial para tu día a día.",
    items: [
      "iPhone 15 (128GB)",
      "AirPods (3ra gen)",
      "Cargador MagSafe"
    ],
    originalPrice: 4397000,
    comboPrice: 4149000,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pink-select-202309?wid=400&hei=400&fmt=png-alpha"
  }
];

export default function Combos() {
  const { addItem } = useCart();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddCombo = (combo: any) => {
    // Adding as a distinct single product instance for simplicity
    addItem({
      id: combo.id,
      product: {
        id: combo.id,
        slug: combo.id,
        name: combo.name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        category: "combo" as any,
        description: combo.description,
        basePrice: combo.comboPrice,
        specs: {},
        defaultImages: [combo.image],
      },
      quantity: 1,
      price: combo.comboPrice,
    });
  };

  return (
    <section id="combos" className="py-24 bg-[var(--black)] relative border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="pill-label mx-auto mb-4" style={{ borderColor: '#E3000B', color: '#E3000B' }}>Especiales iNariño</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Combos <span style={{ color: "#E3000B" }}>Exclusivos</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Lleva el ecosistema completo y ahorra más. Nuestros combos están diseñados para darte la mejor experiencia al mejor precio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((combo, i) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface rounded-2xl p-8 lg:p-12 border flex flex-col justify-between"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{combo.name}</h3>
                <p className="text-zinc-400 mb-6">{combo.description}</p>
                
                <ul className="mb-8 space-y-2">
                  {combo.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#E3000B' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-col gap-1 mb-6 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="line-through text-zinc-500 text-sm">Separado: ${combo.originalPrice.toLocaleString('es-CO')} COP</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: '#E3000B', fontFamily: "'Syne', sans-serif" }}>
                      ${combo.comboPrice.toLocaleString('es-CO')}
                    </span>
                    <span className="text-zinc-500 text-sm">COP</span>
                  </div>
                  <span className="text-xs font-bold text-green-500 mt-1 uppercase tracking-wide">
                    Ahorras ${(combo.originalPrice - combo.comboPrice).toLocaleString('es-CO')}
                  </span>
                </div>
                <button
                  onClick={() => handleAddCombo(combo)}
                  className="btn-primary w-full justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Agregar Combo al Carrito
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
