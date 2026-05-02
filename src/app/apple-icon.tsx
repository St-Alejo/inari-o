import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 130,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span style={{ color: "#E3000B" }}>I</span>
      </div>
    ),
    { ...size }
  );
}
