"use client";

import { Toaster as SonnerToaster } from "sonner";

export default function Toaster() {
  return (
    <SonnerToaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: "var(--surface)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          fontFamily: "var(--font-geist-sans, sans-serif)",
        },
      }}
      theme="dark"
    />
  );
}
