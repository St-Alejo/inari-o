import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "iNariño — Productos Apple Originales · Nariño, Colombia",
  description: "Distribuidor autorizado de productos Apple en Nariño, Colombia. iPhones, AirPods, Apple Watch, accesorios y más. Envío a todo Nariño.",
  keywords: "Apple, iPhone, AirPods, Apple Watch, Nariño, Colombia, Pasto, accesorios Apple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-[#0A0A0A] text-white">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
