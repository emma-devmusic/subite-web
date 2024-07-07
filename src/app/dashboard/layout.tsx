import type { Metadata } from "next";
import Sidebar from '../../components/dashboard/sidebar/Sidebar';
import { Footer, Navbar } from "@/components/dashboard";
import './dashboardStyles.css'

export const metadata: Metadata = {
    title: "Dashboard - Subastas",
    description: "Adminstrador de Subastas App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <Navbar />
            <div className="flex overflow-hidden bg-white pt-16 admin-desktop">
                <Sidebar />
                <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 flex flex-col justify-between">
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}