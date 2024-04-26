
import { AcutionView } from "@/components/dashboard/views/auctions/AcutionView";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Subastas",
    description: "Dashboard de Sara de la página de subastas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <AcutionView />
            {children}
        </div>
    );
}