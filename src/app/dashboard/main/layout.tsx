import type { Metadata } from "next";
import { Tabs } from "./components/Tabs";

export const metadata: Metadata = {
    title: "Dashboard - Main",
    description: "Adminstrador de Subastas App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <Tabs />
            {children}
        </div>
    );
}