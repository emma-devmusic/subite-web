'use client'
import { SocialIcons } from "@/components/socialIcons/SocialIcons";
import { Brand } from "./modules/Brand"
import { LinkList } from "./modules/LinkList"
import { Rights } from "./modules/Rights";
import { usePathname } from "next/navigation";
import { navigation } from "../navbar/data";

export const Footer = () => {
    const pathname = usePathname()

    if (pathname.includes('dashboard') || pathname.includes('login') || pathname.includes('register')) return
    return (
        <footer className="pb-5">
            <div className="bg-white w-[90%] shadow-md border-[1px] rounded-lg m-auto">
                <div className="mt-auto w-full max-w-[85rem] pt-10 pb-5 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                        <div className="col-span-4 md:col-span-1">
                            <Brand />
                        </div>
                        <LinkList titleLinks="Visitá" links={navigation.pages} />
                        <LinkList titleLinks="Instructivos" links={navigation.instructives} />
                        <LinkList titleLinks="Legales" links={navigation.legals} />
                    </div>
                    <div className="mt-5 sm:mt-12 grid gap-y-0 sm:flex sm:justify-between sm:items-center border-2 border-primary rounded-lg py-2 px-4">
                        <Rights />
                        <SocialIcons color='primary' />
                    </div>
                </div>
            </div>
        </footer>
    );
};
