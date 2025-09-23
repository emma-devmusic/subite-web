"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {

  const path = usePathname();
  useEffect(() => {
    // Solo ejecutar en el cliente después de la hidratación
    if (typeof window === 'undefined') return;
    
    const loadPreline = async () => {
      try {
        await import("preline/preline");
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        }
      } catch (error) {
        console.error('Error loading preline:', error);
      }
    };

    loadPreline();
  }, [path]);

  return null;
}