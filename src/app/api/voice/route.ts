import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { buildCatalogContext } from "@/lib/ai/catalog-context";

export const runtime = "nodejs";
export const maxDuration = 20;

function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-ant-api03-XXXXX")) return null;
  return createAnthropic({ apiKey });
}

const VOICE_SYSTEM = `Eres el asesor virtual de voz de Inariño, tienda de Apple en Pasto, Colombia.
Responde siempre en español, con máximo 2 oraciones cortas y claras.
Usa "usted" y sé amable. No uses símbolos ni bullets. Solo texto plano para hablar.
Si el cliente pide hablar con un humano, dile que puede escribirles al WhatsApp de Inariño.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "Demasiadas consultas. Por favor espere un momento." }, { status: 429 });
  }

  const anthropic = getAnthropicClient();
  if (!anthropic) {
    return NextResponse.json(
      { response: "El asistente de voz no está configurado. Agrega tu ANTHROPIC_API_KEY en .env.local." },
      { status: 200 }
    );
  }

  let messages: Array<{ role: "user" | "assistant"; content: string }>;
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages)) throw new Error();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const catalog = buildCatalogContext();

  try {
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5"),
      system: VOICE_SYSTEM + "\n\n" + catalog,
      messages,
      maxTokens: 150,
      temperature: 0.4,
    });

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error("[voice/route]", err);
    return NextResponse.json({ error: "Hubo un error al procesar su consulta." }, { status: 500 });
  }
}
