
import { BannerOne } from "@/components/banners";
import { CardListProducts } from "@/components/cards";
import { BannerTwo } from '@/components';
import { BannerThree } from "@/components/banners/BannerThree";

export const Home = () => {
    return (
        <div>
            <BannerThree />
            <CardListProducts />
        </div>
    )
}
