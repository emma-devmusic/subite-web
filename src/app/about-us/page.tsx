import { BannerPages } from "@/components/banners/BannerPages"
import { WhoWeAre } from "./sections/WhoWeAre";
import { OurMission } from "./sections/OurMission";
import { OurValues } from "./sections/OurValues";
import { StartNow } from "./sections/StartNow";
import dynamic from 'next/dynamic';
import { Spinner } from "@/components/spinner/Spinner";

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div className='h-screen w-full place-content-center'><Spinner /></div>
});

export default function AboutPage() {
    return (
        <ClientLayout>
            <BannerPages title={'Sobre Nosotros'} bg={'about-us'} />
            <main className="container-auction gap-32 mt-24">
                <WhoWeAre />
                <OurMission />
                <OurValues />
                <StartNow />
            </main>
        </ClientLayout>
    );
}