import type { Metadata } from "next";
import { Inter, League_Spartan } from "next/font/google";
import { Providers } from "@/store/Providers";
import { Modal } from "@/components/modal/Modal";
import { Footer, Navbar } from "@/components/ecommerce";
import PrelineScript from "@/components/prelineScript/PrelineScript";
import "./globals.css";

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const league_spartan = League_Spartan({
  subsets: ['latin'],
  display: 'swap',
})

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
      <body className={`${inter.className} bg-gray-50`}>
        <Providers>
          <Navbar />
            {children}
          <Modal />
        </Providers>
        <Footer />
      </body>
      <PrelineScript />
    </html>
  );
}
