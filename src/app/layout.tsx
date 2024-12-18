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
      <body className={`${inter.className} bg-gray-50 relative`}>
        <Providers>
          <Navbar />
          <div className=" inset-0 fixed -z-10 h-full w-full bg-white [background:radial-gradient(25%_25%_at_80%_10%,#ff813244_1%,#f8f8f8_125%)]"></div>
          <div className=" inset-0 fixed -z-10 h-full w-full bg-white [background:radial-gradient(25%_25%_at_10%_80%,#ff813244_1%,transparent_125%)]"></div>
          {children}
          <Modal />
        </Providers>
        <Footer />
      </body>
      <PrelineScript />
    </html>
  );
}
