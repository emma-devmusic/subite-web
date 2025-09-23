import { league_spartan } from "@/app/fonts";

interface Props {
    title: string
    bg: string
}

export const BannerPages = ({ title, bg }: Props) => {
    return (
        <div className="mx-4 mt-14">
            <div className={`bg-${bg} mx-auto !rounded-md overflow-hidden max-w-[1350px]`} id="banner-pages">
                <div className="div-backdrop">
                    <h1 className={`${league_spartan.className} text-3xl sm:text-6xl`}>{title}</h1>
                </div>
            </div>
        </div>
    );
};
