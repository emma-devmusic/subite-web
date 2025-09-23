import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SubastasApp",
  description: "Aplicación de Sara",
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
