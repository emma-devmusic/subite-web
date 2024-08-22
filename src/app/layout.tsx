import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/store/Providers";
import { Modal } from "@/components/modal/Modal";
import { Navbar } from "@/components/ecommerce";
import "./globals.css";
import Script from "next/script";
import PrelineScript from "@/components/prelineScript/PrelineScript";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} `}>
        <Providers>
          <Navbar />
          {children}
          <Modal />
        </Providers>
      </body>
        <PrelineScript />
    </html>
  );
}
