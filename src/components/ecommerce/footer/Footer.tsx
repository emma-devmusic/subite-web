'use client'
import { SocialIcons } from "@/components/socialIcons/SocialIcons";
import { Brand } from "./modules/Brand"
import { LinkList } from "./modules/LinkList"
import { Subscribe } from "./modules/Subscribe";
import { Rights } from "./modules/Rights";
import { links1 } from "./data/linksMock";
import { usePathname } from "next/navigation";
import { navigation } from "../navbar/data";

export const Footer = () => {
    const pathname = usePathname()

    if (pathname.includes('dashboard')) return
    return (
        <footer className=" bg-white w-[90%] shadow-md rounded-lg m-auto mb-5 ">
            <div className="mt-auto w-full max-w-[85rem] pt-10 pb-5 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
                <div className="grid grid-cols-2  gap-6">
                    <Brand />
                    <LinkList titleLinks="Visitá" links={navigation.pages}/>
                </div>
                <div className="mt-5 sm:mt-12 grid gap-y-0 sm:flex sm:justify-between sm:items-center border-2 border-primary rounded-lg p-10">
                    <Rights />
                    <SocialIcons color='primary' />
                </div>
            </div>
        </footer>
    );
};
