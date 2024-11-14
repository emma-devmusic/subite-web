'use client'
import Slider from "react-slick";
import img1 from '../../assets/img/banner3/1.jpg'
import img2 from '../../assets/img/banner3/2.jpg'
import img3 from '../../assets/img/banner3/3.jpg'
import img4 from '../../assets/img/banner3/4.jpg'
import Image from "next/image";
import { btnPrimary } from "@/StylesTailwind/classNames";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
};


export const BannerThree = () => {



    return (
        <div className="m-auto w-[95%] mt-5">
            <Slider {...settings} arrows>
                <div className="min-h-[400px]">
                    <div className="relative flex justify-center banner3">
                        <div className="relative flex justify-center items-center banner3-box">
                            <button className="banner3-box-button border-2 rounded-md px-6 py-4 transition-all text-sm sm:w-auto md:text-xl text-white hover:bg-cyan-600 hover:border-[0px]">
                                Ver Subasta
                            </button>
                            <div className="flex flex-col md:flex-row items-center md:items-end absolute z-20 w-11/12 text-center m-auto h-[90%] justify-end md:justify-between text-white gap-4">
                                <h4 className="text-3xl font-semibold">Nombre de producto</h4>
                                <div className="text-xl">
                                    <p>La Subasta Inicia en:</p>
                                    <div>
                                        5 días, <span>20:59:59</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-full rounded-xl h-full bg-gradient-to-t from-gray-900 from-5% via-transparent to-transparent to-95% z-10"></div>
                            <Image src={img1} height={600} width={1200} alt="textimg" className="rounded-lg m-auto min-h-[400px] w-full object-cover relative" />
                        </div>
                    </div>
                </div>
                <div className="min-h-[400px]">
                    <div className="relative flex justify-center banner3">
                        <div className="relative flex justify-center items-center banner3-box">
                            <button className="banner3-box-button border-2 rounded-md px-6 py-4 transition-all text-sm sm:w-auto md:text-xl text-white hover:bg-cyan-600 hover:border-[0px]">
                                Ver Subasta
                            </button>
                            <div className="flex flex-col md:flex-row items-center md:items-end absolute z-20 w-11/12 text-center m-auto h-[90%] justify-end md:justify-between text-white gap-4">
                                <h4 className="text-3xl font-semibold">Nombre de producto</h4>
                                <div className="text-xl">
                                    <p>La Subasta Inicia en:</p>
                                    <div>
                                        5 días, <span>20:59:59</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-full rounded-xl h-full bg-gradient-to-t from-gray-900 from-5% via-transparent to-transparent to-95% z-10"></div>
                            <Image src={img2} height={600} width={1200} alt="textimg" className="rounded-lg m-auto min-h-[400px] w-full object-cover relative" />
                        </div>
                    </div>
                </div>
                <div className="min-h-[400px]">
                    <div className="relative flex justify-center banner3">
                        <div className="relative flex justify-center items-center banner3-box">
                            <button className="banner3-box-button border-2 rounded-md px-6 py-4 transition-all text-sm sm:w-auto md:text-xl text-white hover:bg-cyan-600 hover:border-[0px]">
                                Ver Subasta
                            </button>
                            <div className="flex flex-col md:flex-row items-center md:items-end absolute z-20 w-11/12 text-center m-auto h-[90%] justify-end md:justify-between text-white gap-4">
                                <h4 className="text-3xl font-semibold">Nombre de producto</h4>
                                <div className="text-xl">
                                    <p>La Subasta Inicia en:</p>
                                    <div>
                                        5 días, <span>20:59:59</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-full rounded-xl h-full bg-gradient-to-t from-gray-900 from-5% via-transparent to-transparent to-95% z-10"></div>
                            <Image src={img3} height={600} width={1200} alt="textimg" className="rounded-lg m-auto min-h-[400px] w-full object-cover relative" />
                        </div>
                    </div>
                </div>
                <div className="min-h-[400px]">
                    <div className="relative flex justify-center banner3">
                        <div className="relative flex justify-center items-center banner3-box">
                            <button className="banner3-box-button border-2 rounded-md px-6 py-4 transition-all text-sm sm:w-auto md:text-xl text-white hover:bg-cyan-600 hover:border-[0px]">
                                Ver Subasta
                            </button>
                            <div className="flex flex-col md:flex-row items-center md:items-end absolute z-20 w-11/12 text-center m-auto h-[90%] justify-end md:justify-between text-white gap-4">
                                <h4 className="text-3xl font-semibold">Nombre de producto</h4>
                                <div className="text-xl">
                                    <p>La Subasta Inicia en:</p>
                                    <div>
                                        5 días, <span>20:59:59</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-full rounded-xl h-full bg-gradient-to-t from-gray-900 from-5% via-transparent to-transparent to-95% z-10"></div>
                            <Image src={img4} height={600} width={1200} alt="textimg" className="rounded-lg m-auto min-h-[400px] w-full object-cover relative" />
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};
