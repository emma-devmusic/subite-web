import { league_spartan } from "@/app/layout";

interface Props {
    title: string
    bg: string
}

export const BannerPages = ({ title, bg }: Props) => {
    return (
        <div className={`bg-${bg} mx-4 !rounded-md overflow-hidden`} id="banner-pages">
            <div className="div-backdrop">
                <h1 className={`${league_spartan.className}`}>{title}</h1>
            </div>
        </div>
    );
};
