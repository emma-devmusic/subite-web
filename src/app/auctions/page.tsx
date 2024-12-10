
import { SearchParams } from "@/actions/products";
import { league_spartan } from "../layout";
import { AuctionsSection } from "./modules/AuctionsSection";
import { MenuFilters } from "./modules/MenuFilters/MenuFilters";
import { Suspense } from "react";

interface Props {
    searchParams: SearchParams;
}
export default function NamePage({searchParams}: Props) {
    return (
        <div className="container-auctions-with-filters">
            <div className={`${league_spartan.className}`}>
                <h1 className="text-center text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
            </div>
            <div className="flex flex-col items-center lg:items-stretch lg:flex-row gap-4">
                <MenuFilters />
                <Suspense fallback={<div>Cargando...</div>}>
                    <AuctionsSection searchParams={searchParams} numberColumns={3}/>
                </Suspense>
            </div>
        </div>
    );
}