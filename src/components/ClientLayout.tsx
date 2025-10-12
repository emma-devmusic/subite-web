"use client";

import { Providers } from "@/store/Providers";
import { Navbar } from "@/components/ecommerce";
import { NavbarFixed } from "@/components/ecommerce/navbar/NavbarFixed";
import { Modal } from "@/components/modal/Modal";
import { Footer } from "@/components/ecommerce";
import PrelineScript from "@/components/prelineScript/PrelineScript";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Providers>
      <Navbar />
      <NavbarFixed />
      <div className=" inset-0 fixed -z-10 h-full w-full bg-white [background:radial-gradient(25%_25%_at_80%_10%,#ff813244_1%,#fff_125%)]"></div>
      <div className=" inset-0 absolute -z-10 h-full w-full bg-white [background:radial-gradient(95%_20%_at_10%_95%,#ff813244_1%,transparent_125%)]"></div>
      {children}
      <Modal />
      <Footer />
      <PrelineScript />
    </Providers>
  );
}
