"use client";

import { useState } from "react";

const MONTHLY_RATE = 0.018;

const termOptions = [6, 12, 18, 24];

function calcMonthly(price: number, months: number): number {
  const r = MONTHLY_RATE;
  return Math.round((price * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
}

export default function FinanceSimulator({ price }: { price: number }) {
  const [months, setMonths] = useState(12);
  const monthly = calcMonthly(price, months);
  const total = monthly * months;

  return (
    <div
      className="rounded-xl p-5 border"
      style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Simulador de financiación</p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {termOptions.map((m) => (
          <button
            key={m}
            onClick={() => setMonths(m)}
            className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
              months === m
                ? "border-[#E3000B] text-[#E3000B] bg-[#E3000B]/10"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {m} cuotas
          </button>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            ${monthly.toLocaleString("es-CO")}
          </span>
          <span className="text-zinc-500 text-xs ml-1">/ mes</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500">Total</p>
          <p className="text-sm text-zinc-300 font-semibold">${total.toLocaleString("es-CO")}</p>
        </div>
      </div>
      <p className="text-[10px] text-zinc-600 mt-3">
        * Simulación con tasa del 1.8% mensual. Consulte condiciones reales con su entidad financiera.
      </p>
    </div>
  );
}
