
import { league_spartan } from "../layout";
import { AuctionsSection } from "./modules/AuctionsSection";

export default function NamePage() {
    return (
        <div className="container-auction ">
            <div className={`${league_spartan.className}`}>
                <h1 className="text-center text-6xl text-secondary">¡Subite a las <span className="text-primary">subastas!</span></h1>
            </div>
            <AuctionsSection />
        </div>
    );
}