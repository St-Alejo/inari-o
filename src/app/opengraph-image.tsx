import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Inariño — Productos Apple Originales en Nariño, Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "radial-gradient(circle at 80% 20%, rgba(227,0,11,0.35) 0%, rgba(8,8,8,1) 60%), #080808",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 110,
            fontWeight: 800,
            letterSpacing: "-4px",
          }}
        >
          <span style={{ color: "#E3000B" }}>Inn</span>
          <span style={{ color: "#fff" }}>arino</span>
          <span
            style={{
              width: 14,
              height: 14,
              background: "#E3000B",
              borderRadius: 999,
              marginLeft: 16,
              marginTop: 70,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#bdbdbd",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Productos Apple originales · Pasto, Nariño · Envío a todo Colombia
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 60,
            fontSize: 22,
            color: "#9a9a9a",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 60, height: 2, background: "#E3000B" }} />
          Distribuidor autorizado
        </div>
      </div>
    ),
    { ...size }
  );
}
