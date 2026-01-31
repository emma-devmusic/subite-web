'use client'

import Slider from "react-slick";
import { ItemHomeProductsSearchResponse } from "@/types/homeResponse";
import { BannerProduct } from "./BannerProduct";
import { alternativesBannerImages } from "@/commons/helpers/constants";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useMemo } from "react";

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

    // Determinar los items a mostrar
    const items = homeProd.length > 0 ? homeProd : alternativesBannerImages;
    const isSingleItem = items.length === 1;

    // Configuración dinámica del slider
    const settings = useMemo(() => ({
        dots: !isSingleItem,
        infinite: !isSingleItem,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 3000,
        autoplay: !isSingleItem,
        easing: "ease-in-out",
    }), [isSingleItem]);

    // Si hay un solo item, renderizar sin slider
    if (isSingleItem) {
        return (
            <div className="relative w-full group/banner sm:mb-24">
                <div className="banner3 mx-auto">
                    <div className="max-h-[500px]">
                        {homeProd.length > 0 
                            ? <BannerProduct itemProduct={homeProd[0]} />
                            : <BannerProduct itemAlternative={alternativesBannerImages[0]} />
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full group/banner">
            <button onClick={previous} className="absolute opacity-30 group-hover/banner:opacity-100 text-gray-200 hover:text-primary transition-all  top-[50%] -translate-y-[50%] left-0 z-50 p-2 backdrop-blur-md rounded-full shadow-md">
                <ArrowLeftCircleIcon className="h-8" />
            </button>
            <button onClick={next} className="absolute opacity-30 group-hover/banner:opacity-100 text-gray-200 hover:text-primary transition-all  top-[50%] -translate-y-[50%] right-0 z-50 p-2 backdrop-blur-md rounded-full shadow-md">
                <ArrowRightCircleIcon className="h-8" />
            </button>
            <Slider
                {...settings}
                className="banner3 mx-auto"
                ref={slider => { sliderRef = slider}}
            >
                {
                    homeProd.length > 0
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

