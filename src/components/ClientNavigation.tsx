"use client";

import { Navbar } from "@/components/ecommerce";
import { NavbarFixed } from "@/components/ecommerce/navbar/NavbarFixed";
import { Modal } from "@/components/modal/Modal";

export default function ClientNavigation() {
  return (
    <>
      <Navbar />
      <NavbarFixed />
      <Modal />
    </>
  );
}
