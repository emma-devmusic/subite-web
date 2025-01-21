import { BannerPages } from "@/components/banners/BannerPages"
import { league_spartan } from "../layout";
import img from '../../assets/img/bg-login.jpg'
import Image from "next/image";
import { WhoWeAre } from "./sections/WhoWeAre";
import { OurMission } from "./sections/OurMission";
import { OurValues } from "./sections/OurValues";
import { StartNow } from "./sections/StartNow";


export default function AboutPage() {
    return (
        <>
            <BannerPages title={'Sobre Nosotros'} bg={'about-us'} />
            <main className="container-auction gap-32 mt-24">
                <WhoWeAre />
                <OurMission />
                <OurValues />
                <StartNow />
            </main>
        </>
    );
}