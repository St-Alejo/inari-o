import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import SplashGate from "@/components/SplashGate";
import AnnouncementBar from "@/components/AnnouncementBar";
import SkipToContent from "@/components/SkipToContent";
import JsonLd from "@/components/JsonLd";
import Toaster from "@/components/ui/Toaster";
import CookieBanner from "@/components/CookieBanner";
import CursorGlow from "@/components/ui/CursorGlow";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { buildMetadata, organizationJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased bg-[#0A0A0A] text-white">
        <SkipToContent />
        <SplashGate />
        <CartProvider>
          <AnnouncementBar />
          {children}
          <CartDrawer />
        </CartProvider>
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd()]} />
        <Toaster />
        <CookieBanner />
        <CursorGlow />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
