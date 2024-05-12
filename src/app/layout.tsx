import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/store/Providers";
import { Modal } from "@/components/modal/Modal";
import { Navbar } from "@/components/ecommerce";
import "./globals.css";

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
        </Providers>
        {/* <Modal /> */}
      </body>
    </html>
  );
}
