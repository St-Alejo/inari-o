"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import BrandLogo from "@/components/BrandLogo";

// ─── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  email: z.string().email("Correo inválido"),
  firstName: z.string().min(2, "Nombre requerido"),
  lastName: z.string().min(2, "Apellidos requeridos"),
  document: z.string().min(5, "Cédula requerida"),
  address: z.string().min(5, "Dirección requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  phone: z.string().min(7, "Teléfono requerido"),
});
type FormData = z.infer<typeof schema>;

// ─── City + shipping data ─────────────────────────────────────────────────────
const CITY_DATA: Record<string, { shipping: number; days: string; zone: "pasto" | "narino" | "nacional" }> = {
  Pasto:         { shipping: 0,     days: "24 horas",      zone: "pasto" },
  Ipiales:       { shipping: 15000, days: "2–3 días",      zone: "narino" },
  Tumaco:        { shipping: 15000, days: "2–3 días",      zone: "narino" },
  "Túquerres":   { shipping: 15000, days: "2–3 días",      zone: "narino" },
  "La Unión":    { shipping: 15000, days: "2–3 días",      zone: "narino" },
  "Samaniego":   { shipping: 15000, days: "2–4 días",      zone: "narino" },
  "Barbacoas":   { shipping: 15000, days: "3–5 días",      zone: "narino" },
  Bogotá:        { shipping: 25000, days: "3–5 días",      zone: "nacional" },
  Medellín:      { shipping: 25000, days: "3–5 días",      zone: "nacional" },
  Cali:          { shipping: 25000, days: "3–5 días",      zone: "nacional" },
  Barranquilla:  { shipping: 25000, days: "4–6 días",      zone: "nacional" },
  Bucaramanga:   { shipping: 25000, days: "3–5 días",      zone: "nacional" },
  Cartagena:     { shipping: 25000, days: "4–6 días",      zone: "nacional" },
  Manizales:     { shipping: 25000, days: "3–5 días",      zone: "nacional" },
  Pereira:       { shipping: 25000, days: "3–5 días",      zone: "nacional" },
  Otro:          { shipping: 25000, days: "4–7 días",      zone: "nacional" },
};
const CITIES = Object.keys(CITY_DATA);

type DeliveryMethod = "domicilio" | "contra-entrega" | "retiro";
type PaymentMethod  = "wompi" | "contra-entrega";

const WOMPI_PUB_KEY = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? "pub_test_Q5yDA0qKBZ3pS92UOk4r73P5GqWev2Y7";

// ─── Sub-components ───────────────────────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  const steps = ["Datos", "Envío", "Pago"];
  return (
    <div className="flex items-center gap-2 mb-10">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors"
                style={{
                  background: done || active ? "#E3000B" : "rgba(255,255,255,0.08)",
                  color: done || active ? "white" : "#71717a",
                }}
              >
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : num}
              </div>
              <span className={`text-xs font-medium ${active ? "text-white" : "text-zinc-500"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-8 h-px" style={{ background: step > num ? "#E3000B" : "rgba(255,255,255,0.1)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-zinc-400 font-medium">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

const inputCls = "bg-[var(--surface)] border border-white/10 rounded-md p-3.5 text-sm text-white focus:outline-none focus:border-[#E3000B]/60 transition-colors placeholder:text-zinc-600";

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [reference, setReference] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("domicilio");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wompi");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { city: "Pasto" },
  });

  const city = watch("city");
  const cityInfo = CITY_DATA[city] ?? CITY_DATA["Otro"];
  const isLocalCity = cityInfo.zone === "pasto";

  // Shipping cost based on delivery method
  const shippingCost =
    deliveryMethod === "retiro" ? 0 :
    deliveryMethod === "contra-entrega" ? (isLocalCity ? 10000 : cityInfo.shipping + 10000) :
    cityInfo.shipping;

  const finalTotal = cartTotal + shippingCost;
  const amountInCents = finalTotal * 100;

  useEffect(() => {
    setIsMounted(true);
    setReference(`INN-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`);
  }, []);

  useEffect(() => {
    if (isMounted && items.length === 0) router.push("/cart");
  }, [items, isMounted, router]);

  // When city changes, reset contra-entrega if not available
  useEffect(() => {
    if (!isLocalCity && deliveryMethod === "contra-entrega") {
      setDeliveryMethod("domicilio");
    }
  }, [city, isLocalCity, deliveryMethod]);

  if (!isMounted || items.length === 0) return null;

  const redirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/checkout/success`
      : "";

  const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

  return (
    <main className="bg-black min-h-screen text-white flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="flex-1 p-5 sm:p-8 lg:p-16 lg:pr-24 lg:pl-32 flex justify-end">
        <div className="w-full max-w-xl flex flex-col pt-8">
          <Link href="/cart" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al carrito
          </Link>

          <div className="mb-10">
            <BrandLogo size="lg" href="/" />
          </div>

          <StepBar step={step} />

          {/* ── Step 1: Datos ── */}
          {step === 1 && (
            <form onSubmit={handleSubmit(() => setStep(2))} className="flex flex-col gap-5">
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Datos de contacto</h2>
              <Field label="Correo electrónico" error={errors.email?.message}>
                <input {...register("email")} type="email" placeholder="correo@ejemplo.com" className={inputCls} />
              </Field>

              <h2 className="text-xl font-bold mt-2" style={{ fontFamily: "'Syne', sans-serif" }}>Dirección de envío</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nombre" error={errors.firstName?.message}>
                  <input {...register("firstName")} type="text" placeholder="Tu nombre" className={inputCls} />
                </Field>
                <Field label="Apellidos" error={errors.lastName?.message}>
                  <input {...register("lastName")} type="text" placeholder="Apellidos" className={inputCls} />
                </Field>
              </div>
              <Field label="Número de cédula" error={errors.document?.message}>
                <input {...register("document")} type="text" placeholder="123456789" className={inputCls} />
              </Field>
              <Field label="Dirección y barrio" error={errors.address?.message}>
                <input {...register("address")} type="text" placeholder="Cra 25 # 18-40, Centro" className={inputCls} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Ciudad" error={errors.city?.message}>
                  <select {...register("city")} className={inputCls + " appearance-none"}>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="País">
                  <div className={inputCls + " text-zinc-500"}>Colombia</div>
                </Field>
              </div>
              <Field label="Teléfono" error={errors.phone?.message}>
                <input {...register("phone")} type="tel" placeholder="311 234 5678" className={inputCls} />
              </Field>
              <button type="submit" className="btn-primary w-full py-4 justify-center mt-2">
                Continuar al envío →
              </button>
            </form>
          )}

          {/* ── Step 2: Envío ── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Método de entrega</h2>

              {/* Delivery options */}
              <div className="flex flex-col gap-3">
                {/* Envío a domicilio */}
                <DeliveryOption
                  value="domicilio"
                  selected={deliveryMethod === "domicilio"}
                  onSelect={() => setDeliveryMethod("domicilio")}
                  icon="🚚"
                  title="Envío a domicilio"
                  description={`${city} · ${cityInfo.days}`}
                  price={cityInfo.shipping === 0 ? "Gratis" : fmt(cityInfo.shipping)}
                  priceGreen={cityInfo.shipping === 0}
                  badge={cityInfo.zone === "pasto" ? "Rápido" : undefined}
                />

                {/* Contra entrega — solo Pasto */}
                {isLocalCity && (
                  <DeliveryOption
                    value="contra-entrega"
                    selected={deliveryMethod === "contra-entrega"}
                    onSelect={() => { setDeliveryMethod("contra-entrega"); setPaymentMethod("contra-entrega"); }}
                    icon="💵"
                    title="Contra entrega"
                    description="Pagas al recibir en Pasto · 24 h"
                    price={fmt(10000)}
                    badge="Solo Pasto"
                  />
                )}

                {/* Retiro en tienda */}
                {isLocalCity && (
                  <DeliveryOption
                    value="retiro"
                    selected={deliveryMethod === "retiro"}
                    onSelect={() => { setDeliveryMethod("retiro"); setPaymentMethod("wompi"); }}
                    icon="🏪"
                    title="Retiro en tienda"
                    description="Pasto · Disponible en 2 horas"
                    price="Gratis"
                    priceGreen
                  />
                )}
              </div>

              {/* Estimated delivery note */}
              <div className="rounded-xl px-4 py-3 text-sm flex items-start gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E3000B" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {deliveryMethod === "domicilio" && `Entrega estimada en ${cityInfo.days} hábiles via Interrapidísimo.`}
                  {deliveryMethod === "contra-entrega" && "El domiciliario llega en 24 h. Ten el dinero exacto listo."}
                  {deliveryMethod === "retiro" && "Te avisamos por WhatsApp cuando esté listo. Traer tu cédula."}
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                  ← Atrás
                </button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1 py-4 justify-center">
                  Continuar al pago →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Pago ── */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Método de pago</h2>

              {/* Payment method picker — only if delivery allows choice */}
              {deliveryMethod !== "contra-entrega" && (
                <div className="flex flex-col gap-3">
                  <DeliveryOption
                    value="wompi"
                    selected={paymentMethod === "wompi"}
                    onSelect={() => setPaymentMethod("wompi")}
                    icon="💳"
                    title="Pago en línea"
                    description="PSE · Nequi · Bancolombia · Tarjeta"
                    price="Wompi"
                    badge="100% seguro"
                  />
                  {isLocalCity && deliveryMethod === "retiro" && (
                    <DeliveryOption
                      value="contra-entrega"
                      selected={paymentMethod === "contra-entrega"}
                      onSelect={() => setPaymentMethod("contra-entrega")}
                      icon="💵"
                      title="Efectivo en tienda"
                      description="Pagas al retirar en Pasto"
                      price="Gratis"
                      priceGreen
                    />
                  )}
                </div>
              )}

              {/* Payment logos strip */}
              {paymentMethod === "wompi" && (
                <div className="rounded-xl border p-4 flex flex-col gap-3" style={{ background: "var(--surface)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Métodos disponibles vía Wompi</p>
                  <div className="flex gap-2 flex-wrap">
                    {["PSE", "Nequi", "Bancolombia", "Visa", "Mastercard", "American Express"].map((m) => (
                      <span key={m} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300 font-medium">{m}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Order summary */}
              <div className="rounded-xl border p-4 flex flex-col gap-3 text-sm" style={{ background: "var(--surface)", borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Resumen</p>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal</span>
                  <span>{fmt(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    {deliveryMethod === "retiro" ? "Retiro en tienda" :
                     deliveryMethod === "contra-entrega" ? "Contra entrega" :
                     `Envío a ${city}`}
                  </span>
                  <span className={shippingCost === 0 ? "text-emerald-400" : ""}>
                    {shippingCost === 0 ? "Gratis" : fmt(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 font-bold">
                  <span>Total</span>
                  <span className="text-[#E3000B]">{fmt(finalTotal)} COP</span>
                </div>
              </div>

              {/* CTA */}
              {paymentMethod === "wompi" ? (
                <form action="https://checkout.wompi.co/p/" method="GET" onSubmit={() => setTimeout(clearCart, 500)}>
                  <input type="hidden" name="public-key" value={WOMPI_PUB_KEY} />
                  <input type="hidden" name="currency" value="COP" />
                  <input type="hidden" name="amount-in-cents" value={amountInCents} />
                  <input type="hidden" name="reference" value={reference} />
                  <input type="hidden" name="redirect-url" value={redirectUrl} />
                  <input type="hidden" name="customer-data:email" value={watch("email")} />
                  <input type="hidden" name="customer-data:full-name" value={`${watch("firstName")} ${watch("lastName")}`} />
                  <input type="hidden" name="customer-data:phone-number" value={watch("phone")} />

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                      ← Atrás
                    </button>
                    <button type="submit" className="btn-primary flex-1 py-4 justify-center shadow-lg">
                      Pagar con Wompi →
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl border p-4 text-sm text-zinc-400" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                    Tu pedido quedará confirmado. Paga al recibir o retirar.
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl border border-white/10 text-sm font-medium hover:border-white/20 transition-colors">
                      ← Atrás
                    </button>
                    <button
                      onClick={() => {
                        clearCart();
                        router.push(`/checkout/success?ref=${reference}`);
                      }}
                      className="btn-primary flex-1 py-4 justify-center shadow-lg"
                    >
                      Confirmar pedido →
                    </button>
                  </div>
                </div>
              )}

              <p className="text-center text-[11px] text-zinc-600 uppercase tracking-widest">
                Pago 100% seguro y encriptado
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Order summary — hidden on mobile, shown from md */}
      <div className="hidden md:flex md:w-[380px] lg:w-[440px] xl:w-[480px] flex-shrink-0 bg-[var(--surface)] border-l border-white/5 p-6 lg:p-16 lg:pl-20 justify-start">
        <OrderSummary items={items} cartTotal={cartTotal} shippingCost={shippingCost} />
      </div>
      {/* Mobile order summary — shown below form */}
      <div className="md:hidden p-5 sm:p-8 border-t border-white/5" style={{ background: "var(--surface)" }}>
        <OrderSummary items={items} cartTotal={cartTotal} shippingCost={shippingCost} />
      </div>
    </main>
  );
}

// ─── Delivery option card ─────────────────────────────────────────────────────
function DeliveryOption({
  selected, onSelect, icon, title, description, price, priceGreen, badge,
}: {
  value: string;
  selected: boolean;
  onSelect: () => void;
  icon: string;
  title: string;
  description: string;
  price: string;
  priceGreen?: boolean;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center justify-between rounded-xl p-4 border w-full text-left transition-colors"
      style={{
        background: selected ? "rgba(227,0,11,0.06)" : "var(--surface)",
        borderColor: selected ? "rgba(227,0,11,0.4)" : "rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
          style={{ borderColor: selected ? "#E3000B" : "rgba(255,255,255,0.3)" }}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-[#E3000B]" />}
        </div>
        <span className="text-base">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-white flex items-center gap-2">
            {title}
            {badge && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E3000B]/15 text-[#E3000B] font-bold uppercase tracking-wide">{badge}</span>}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
        </div>
      </div>
      <span className={`text-sm font-bold flex-shrink-0 ml-3 ${priceGreen ? "text-emerald-400" : "text-white"}`}>
        {price}
      </span>
    </button>
  );
}
