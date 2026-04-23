"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(false);
  const [reference, setReference] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "Pasto",
    phone: "",
    document: "",
  });

  useEffect(() => {
    setIsMounted(true);
    // Generate a secure enough random reference for testing
    setReference(`INARINO-${Date.now()}-${Math.floor(Math.random() * 10000)}`);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push("/cart");
    }
  }, [items, isMounted, router]);

  if (!isMounted || items.length === 0) return null;

  const formatPrice = (price: number) => "$" + price.toLocaleString("es-CO");
  const shippingCost = 0;
  const finalTotal = cartTotal + shippingCost;
  const amountInCents = finalTotal * 100;
  
  // Clave pública de pruena Wompi
  const WOMPI_PUB_KEY = "pub_test_Q5yDA0qKBZ3pS92UOk4r73P5GqWev2Y7"; 
  const REDIRECT_URL = typeof window !== "undefined" ? `${window.location.origin}/checkout/success` : "";

  return (
    <main className="bg-black min-h-screen text-white flex flex-col md:flex-row">
      
      {/* LEFT: Checkout Form */}
      <div className="flex-1 p-6 lg:p-16 lg:pr-24 lg:pl-32 flex justify-end">
        <div className="w-full max-w-xl flex flex-col pt-8">
          <Link href="/cart" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al carrito
          </Link>

          <a href="/" className="flex items-center gap-1 mb-10">
            <span className="text-2xl font-bold tracking-tighter" style={{ fontFamily: "'Syne', sans-serif", color: "#E3000B" }}>i</span>
            <span className="text-2xl font-bold tracking-tighter text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Nariño</span>
          </a>

          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Datos de contacto</h2>
          
          <div className="flex flex-col gap-4 mb-10">
            <input 
              type="email" placeholder="Correo electrónico" 
              className="w-full bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Dirección de envío</h2>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <input type="text" placeholder="Nombre" className="col-span-1 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-red-500" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" placeholder="Apellidos" className="col-span-1 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-red-500" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
            <input type="text" placeholder="Cédula" className="col-span-2 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-red-500" value={formData.document} onChange={e => setFormData({...formData, document: e.target.value})} />
            <input type="text" placeholder="Dirección y barrio" className="col-span-2 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-red-500" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            
            <select className="col-span-1 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-zinc-400 focus:outline-none focus:border-red-500 appearance-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
              <option value="Pasto">Pasto</option>
              <option value="Ipiales">Ipiales</option>
              <option value="Tumaco">Tumaco</option>
              <option value="Túquerres">Túquerres</option>
              <option value="La Unión">La Unión</option>
            </select>
            
            <div className="col-span-1 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-zinc-500">
              Nariño, Colombia
            </div>
            <input type="tel" placeholder="Teléfono" className="col-span-2 bg-[var(--surface)] border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-red-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>

          {/* Form to submit to Wompi */}
          <form action="https://checkout.wompi.co/p/" method="GET" className="mt-4">
            <input type="hidden" name="public-key" value={WOMPI_PUB_KEY} />
            <input type="hidden" name="currency" value="COP" />
            <input type="hidden" name="amount-in-cents" value={amountInCents} />
            <input type="hidden" name="reference" value={reference} />
            <input type="hidden" name="redirect-url" value={REDIRECT_URL} />
            
            {/* Opcionales para llenar el form de Wompi de una */}
            <input type="hidden" name="customer-data:email" value={formData.email} />
            <input type="hidden" name="customer-data:full-name" value={`${formData.firstName} ${formData.lastName}`} />
            <input type="hidden" name="customer-data:phone-number" value={formData.phone} />
            
            <button 
              type="submit" 
              className="btn-primary w-full py-5 text-base justify-center shadow-lg"
              disabled={!formData.email || !formData.firstName || !formData.address}
            >
              Pagar con Wompi
            </button>
            <p className="text-center text-[11px] text-zinc-500 mt-4 uppercase tracking-widest">Pago 100% seguro y encriptado</p>
          </form>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="flex-1 bg-[var(--surface)] border-l border-white/5 p-6 lg:p-16 lg:pl-20">
        <div className="w-full max-w-md pt-8 sticky top-16">
          <h3 className="text-sm font-bold text-zinc-400 mb-8 uppercase tracking-widest">Resumen del pedido</h3>
          
          <div className="flex flex-col gap-6 mb-8 max-h-[50vh] overflow-y-auto pr-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-16 h-16 rounded-lg bg-[var(--black)] border border-white/10 flex items-center justify-center p-2">
                  <Image src={item.color?.images[0] || item.product.defaultImages[0]} alt={item.product.name} width={60} height={60} className="object-contain" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-600 flex items-center justify-center text-[10px] font-bold shadow-md">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{item.product.name}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{[item.variant?.name, item.color?.name].filter(Boolean).join(" · ")}</p>
                </div>
                <div className="text-sm font-medium">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 py-6 border-y border-white/10 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Envío</span>
              <span className="text-white">Gratis</span>
            </div>
          </div>

          <div className="flex justify-between items-end pt-6">
            <span className="text-xl font-bold">Total</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">COP</span>
              <span className="text-3xl font-bold" style={{ color: "#E3000B", fontFamily: "'Syne', sans-serif" }}>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
