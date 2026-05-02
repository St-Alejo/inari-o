"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "ai/react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import ProductCardInline from "./ProductCardInline";
import HandoffCard from "./HandoffCard";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import type { Product } from "@/data/products";

type ToolResult =
  | { action: "ADD_TO_CART"; payload: { id: string; product: Product; variant: unknown; color: unknown; quantity: number; price: number } }
  | { action: "GO_TO_CHECKOUT" }
  | { action: "HANDOFF_WHATSAPP"; whatsappUrl: string }
  | { found: boolean; products?: unknown[] }
  | { offers?: unknown[] }
  | unknown;

export default function ChatWidget({ prefill }: { prefill?: string }) {
  const [open, setOpen] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, error } =
    useChat({
      api: "/api/chat",
      onError: () => {},
    });

  // Check if API is configured on mount
  useEffect(() => {
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    })
      .then((r) => {
        setConfigured(r.status !== 503);
      })
      .catch(() => setConfigured(false));
  }, []);

  // Auto-prefill when opened with a product context
  useEffect(() => {
    if (open && prefill && messages.length === 0) {
      setInput(prefill);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, prefill, messages.length, setInput]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Process tool call results (client-side actions)
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;

    for (const inv of (last.toolInvocations ?? [])) {
      const result = inv.state === "result" ? inv.result as ToolResult : undefined;
      if (!result) continue;

      if (typeof result === "object" && result !== null && "action" in result) {
        if (result.action === "ADD_TO_CART" && "payload" in result) {
          const p = (result as { action: "ADD_TO_CART"; payload: { id: string; product: Product; variant: unknown; color: unknown; quantity: number; price: number } }).payload;
          addItem({
            id: p.id,
            product: p.product,
            variant: p.variant as never,
            color: p.color as never,
            quantity: p.quantity,
            price: p.price,
          });
          setTimeout(() => setIsCartOpen(true), 400);
        } else if (result.action === "GO_TO_CHECKOUT") {
          setTimeout(() => {
            setOpen(false);
            router.push("/checkout");
          }, 800);
        }
      }
    }
  }, [messages, addItem, setIsCartOpen, router]);

  const handleQuickReply = (text: string) => {
    setInput(text);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }, 50);
  };

  const showQuickReplies = messages.length === 0 && !isLoading;

  return (
    <>
      {/* FAB trigger (also serves as the target for PDP button) */}
      <button
        id="chat-widget-trigger"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{ background: "#E3000B" }}
        aria-label="Abrir asistente de ventas"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
        {configured === false && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#080808]" title="Sin configurar" />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
              className="fixed bottom-24 right-2 sm:right-4 md:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] md:w-[400px] rounded-2xl flex flex-col overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                maxHeight: "min(520px, calc(100dvh - 120px))",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#E3000B]/20 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-[#E3000B]">I</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      Asesor Inariño
                    </p>
                    <p className="text-[10px] text-emerald-400">● En línea</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 min-h-0">
                {/* Not configured warning */}
                {configured === false && (
                  <div className="rounded-xl p-4 border border-amber-400/20 bg-amber-400/5 text-xs text-amber-300 leading-relaxed">
                    <p className="font-bold mb-1">⚙️ Asistente no configurado</p>
                    <p>
                      Para activar el chat IA, crea <code className="bg-white/10 px-1 rounded">.env.local</code> con tu{" "}
                      <code className="bg-white/10 px-1 rounded">ANTHROPIC_API_KEY</code>.
                      <br />
                      Obtén una en{" "}
                      <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" className="underline">
                        console.anthropic.com
                      </a>
                    </p>
                  </div>
                )}

                {/* Welcome */}
                {messages.length === 0 && (
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#E3000B]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-[#E3000B]">I</span>
                    </div>
                    <div
                      className="px-3 py-2.5 rounded-2xl rounded-bl-sm text-sm text-zinc-200 max-w-[85%]"
                      style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      ¡Hola! Soy el asesor virtual de Inariño. ¿En qué le puedo ayudar hoy?
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "items-end gap-2"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-[#E3000B]/20 flex items-center justify-center flex-shrink-0 self-end">
                        <span className="text-[10px] font-bold text-[#E3000B]">I</span>
                      </div>
                    )}
                    <div className={`max-w-[85%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      {/* Text content */}
                      {msg.content && msg.role === "user" && (
                        <div
                          className="px-3 py-2.5 rounded-2xl rounded-br-sm text-sm text-white"
                          style={{ background: "#E3000B" }}
                        >
                          {msg.content}
                        </div>
                      )}
                      {msg.content && msg.role === "assistant" && (
                        <div
                          className="px-3 py-2.5 rounded-2xl rounded-bl-sm text-sm text-zinc-200 whitespace-pre-wrap"
                          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {msg.content}
                        </div>
                      )}

                      {/* Tool results rendered as UI */}
                      {(msg.toolInvocations ?? []).map((inv, pi) => {
                        if (inv.state !== "result") return null;
                        const result = inv.result as ToolResult | undefined;
                        if (!result) return null;

                        // searchProducts / getCurrentOffers
                        if (typeof result === "object" && result !== null) {
                          const r = result as Record<string, unknown>;

                          if ("products" in r && Array.isArray(r.products) && r.products.length > 0) {
                            return (
                              <div key={pi} className="w-full">
                                {(r.products as Array<{ slug: string; name: string; price: number; originalPrice?: number | null; image: string; stock: number; badge?: string | null; condition?: string; grade?: string | null }>).map((p) => (
                                  <ProductCardInline key={p.slug} product={p} />
                                ))}
                              </div>
                            );
                          }

                          if ("offers" in r && Array.isArray(r.offers) && r.offers.length > 0) {
                            return (
                              <div key={pi} className="w-full">
                                {(r.offers as Array<{ slug: string; name: string; price: number; originalPrice?: number | null; image: string; badge?: string | null }>).map((p) => (
                                  <ProductCardInline
                                    key={p.slug}
                                    product={{ ...p, stock: 5, condition: "nuevo" }}
                                  />
                                ))}
                              </div>
                            );
                          }

                          if ("action" in r && r.action === "HANDOFF_WHATSAPP" && "whatsappUrl" in r) {
                            return <HandoffCard key={pi} url={r.whatsappUrl as string} />;
                          }
                        }

                        return null;
                      })}
                    </div>
                  </div>
                ))}

                {isLoading && <TypingIndicator />}

                {error && (
                  <p className="text-xs text-red-400 text-center">
                    {error.message ?? "Error de conexión. Intente de nuevo."}
                  </p>
                )}

                {showQuickReplies && <QuickReplies onSelect={handleQuickReply} />}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 px-3 py-3 border-t flex-shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Escríbame su consulta..."
                  disabled={isLoading || configured === false}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#E3000B]/60 transition-colors disabled:opacity-50"
                  aria-label="Mensaje al asistente"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || configured === false}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 flex-shrink-0"
                  style={{ background: "#E3000B" }}
                  aria-label="Enviar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
