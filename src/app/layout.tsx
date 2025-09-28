import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Subite Subastas",
  description: "Plataforma de subastas en línea donde compradores y vendedores se conectan para pujar y adquirir productos únicos de manera segura y transparente.",
  keywords: "subastas, compras, ventas, productos, pujas, mercado en línea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="">
      <body className={`${inter.variable} !font-sans bg-slate-50 relative`}>
        {children}
      </body>
    </html>
  );
}
