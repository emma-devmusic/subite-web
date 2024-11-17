'use client'

import Slider from "react-slick";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { BannerProduct } from "./BannerProduct";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
};


export const BannerThree = () => {

    const { homeProducts } = useAppSelector(state => state.home)
    const [homeProd, setHomeProd] = useState<ItemHomeProductsSearchResponse[] | null>()

    useEffect(() => {
        setHomeProd(homeProducts)
    }, [homeProducts])

    return (
        <div className="m-auto w-[95%] mt-5 min-h-[400px] max-h-[500px] max-w-[1184px] banner3">
            <Slider {...settings} arrows>
                {homeProd && homeProd.map(item =>
                    <div className="min-h-[400px] max-h-[500px] max-w-[1184px]" key={item.id}>
                        <BannerProduct key={item.id} itemProduct={item} />
                    </div>)}
            </Slider>
        </div>
    );
};

