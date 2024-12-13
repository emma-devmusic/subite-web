'use client'

import Slider from "react-slick";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { BannerProduct } from "./BannerProduct";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
};

interface Props {
    homeProd: ItemHomeProductsSearchResponse[]
}

export const BannerThree = ({ homeProd }: Props) => {

    return (
        <Slider {...settings} className="banner3">
            {homeProd.map(item =>
                <div className="max-h-[500px] object-cover max-w-[1184px]" key={item.id}>
                    <BannerProduct key={item.id} itemProduct={item} />
                </div>)}
        </Slider>
    );
};

