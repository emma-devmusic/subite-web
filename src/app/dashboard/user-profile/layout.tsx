
import { Spinner } from "@/components/spinner/Spinner";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
    title: "Dashboard - Perfil de Usuario",
    description: "Perfil del usuario de la página de Subastas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    );
}