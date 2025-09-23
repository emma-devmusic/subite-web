export const revalidate = 60

import { SearchParams } from "@/services-actions/home/products";
import { league_spartan } from "../fonts";
import { MenuFilters } from "./modules/MenuFilters/MenuFilters";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner/Spinner";
import AuctionsSection from "./modules/AuctionsSection";
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div className='h-screen w-full place-content-center'><Spinner /></div>
});

interface Props {
    searchParams: SearchParams;
}
export default function NamePage({ searchParams }: Props) {

    return (
        <ClientLayout>
            <div className="container-auctions-with-filters">
                <div className={`${league_spartan.className}`}>
                    <h1 className="text-center mt-10 lg:mt-0 text-4xl lg:text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
                </div>
            <div className="flex flex-col items-center lg:items-stretch lg:flex-row gap-4">
                <Suspense>
                    <MenuFilters />
                </Suspense>
                <Suspense fallback={<Spinner />}>
                    <AuctionsSection searchParams={searchParams} numberColumns={3} />
                </Suspense>
            </div>
        </div>
        </ClientLayout>
    );
}