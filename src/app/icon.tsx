import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: "-1px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span style={{ color: "#E3000B" }}>I</span>
      </div>
    ),
    { ...size }
  );
}
