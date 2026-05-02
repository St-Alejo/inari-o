import type { Order } from "@/lib/orders/mock-store";

export default function OrderTimeline({ timeline }: { timeline: Order["timeline"] }) {
  return (
    <ol className="flex flex-col gap-0">
      {timeline.map((step, i) => (
        <li key={step.status} className="flex gap-4">
          {/* Track */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: step.done ? "#E3000B" : "rgba(255,255,255,0.06)",
                border: step.done ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {step.done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <span className="w-2 h-2 rounded-full bg-zinc-600" />
              )}
            </div>
            {i < timeline.length - 1 && (
              <div
                className="w-0.5 flex-1 my-1 min-h-[24px]"
                style={{ background: step.done ? "rgba(227,0,11,0.3)" : "rgba(255,255,255,0.06)" }}
              />
            )}
          </div>
          {/* Content */}
          <div className="pb-6 flex-1">
            <p className={`text-sm font-semibold ${step.done ? "text-white" : "text-zinc-500"}`}>
              {step.label}
            </p>
            {step.date && (
              <p className="text-[11px] text-zinc-600 mt-0.5">{step.date}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
