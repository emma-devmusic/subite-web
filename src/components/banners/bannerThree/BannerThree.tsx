'use client'

import Slider from "react-slick";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { BannerProduct } from "./BannerProduct";
import { alternativesBannerImages } from "@/helpers/constants";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
    easing: "ease-in-out",
};

interface Props {
    homeProd: ItemHomeProductsSearchResponse[]
}

export const BannerThree = ({ homeProd }: Props) => {
    let sliderRef: any = useRef<any>(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    return (
        <div className="relative w-full group/banner">
            <button onClick={previous} className="absolute opacity-0 group-hover/banner:opacity-100 text-gray-200 hover:text-primary transition-all  top-[50%] -translate-y-[50%] left-0 z-50 p-2 backdrop-blur-md rounded-full shadow-md">
                <ArrowLeftCircleIcon className="h-8" />
            </button>
            <button onClick={next} className="absolute opacity-0 group-hover/banner:opacity-100 text-gray-200 hover:text-primary transition-all  top-[50%] -translate-y-[50%] right-0 z-50 p-2 backdrop-blur-md rounded-full shadow-md">
                <ArrowRightCircleIcon className="h-8" />
            </button>
            <Slider
                {...settings}
                className="banner3 mx-auto"
                ref={slider => { sliderRef = slider}}
            >
                {
                    homeProd.length > 1
                        ? homeProd.map(item =>
                            <div className="max-h-[500px]" key={item.id}>
                                <BannerProduct itemProduct={item} />
                            </div>)
                        : alternativesBannerImages.map(
                            (item, index) =>
                                <div className="max-h-[500px]" key={index}>
                                    <BannerProduct itemAlternative={item} />
                                </div>
                        )
                }
            </Slider>
        </div>
    );
};

