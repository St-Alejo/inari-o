import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { buildCatalogContext } from "@/lib/ai/catalog-context";
import { chatTools } from "@/lib/ai/tools";
import { checkRateLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

// ─── API key check ────────────────────────────────────────────────────────────
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.startsWith("sk-ant-api03-XXXXX")) {
    return null;
  }
  return createAnthropic({ apiKey });
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      {
        error:
          "Demasiadas consultas. Por favor espere un momento antes de continuar.",
      },
      { status: 429 }
    );
  }

  // Check API key
  const anthropic = getAnthropicClient();
  if (!anthropic) {
    return NextResponse.json(
      {
        error:
          "El asistente no está configurado aún. Agregue su ANTHROPIC_API_KEY en .env.local para activarlo.",
      },
      { status: 503 }
    );
  }

  let messages;
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages)) throw new Error("messages missing");
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt();
  const catalogContext = buildCatalogContext();

  try {
    const result = await streamText({
      model: anthropic("claude-haiku-4-5"),
      system: systemPrompt,
      messages: [
        // Inject catalog as first user/assistant pair so it gets cached
        {
          role: "user",
          content: [
            {
              type: "text",
              text: catalogContext,
              experimental_providerMetadata: {
                anthropic: { cacheControl: { type: "ephemeral" } },
              },
            },
          ],
        },
        {
          role: "assistant",
          content:
            "Entendido. Tengo el catálogo cargado y estoy listo para ayudar.",
        },
        ...messages,
      ],
      tools: chatTools,
      maxTokens: 1024,
      temperature: 0.3,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[chat/route]", err);
    return NextResponse.json(
      {
        error:
          "Hubo un error al procesar su consulta. Por favor intente de nuevo.",
      },
      { status: 500 }
    );
  }
}
