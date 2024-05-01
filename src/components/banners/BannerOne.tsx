import Image from "next/image";
import { ButtonOne,ButtonSmall } from "../buttons";

export const BannerOne = () => {
    return (
        <div className="bg-white flex p-3 flex-col gap-4 md:flex-row lg:px-20" id="bannerOne">
            <div className="box-image-1 basis-2/3 relative flex justify-center items-center shadow-md shadow-slate-400">
                <Image
                    className="object-cover w-full h-[416px]"
                    width={900}
                    height={400}
                    src={'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg'}
                    alt="Image Product"
                />
                <div className="absolute gap-5 bg-black bg-opacity-30 w-full h-full flex flex-col justify-center items-center">
                    <h5 className="text-3xl md:text-5xl font-bold text-white">Promo Title</h5>
                    <p className="text-white max-w-sm text-center">Promo parragraph. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, voluptate!.</p>
                    <ButtonOne text="Ver" />
                </div>
            </div>

            <div className="flex flex-col basis-1/3 gap-4">
                <div className="box-image-2 hoverImage h-[200px] relative flex justify-center items-center shadow-md shadow-slate-400">
                    <Image
                        className="object-cover w-full h-[300px]"
                        width={300}
                        height={300}
                        src={'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg'}
                        alt="Image Product"
                    />
                    <div className="absolute bg-black bg-opacity-30 w-full h-full flex flex-col gap-3 justify-center items-center">
                        <p className="text-white w-80 text-center">Save 20%</p>
                        <h5 className="text-2xl font-bold text-white">Special Offer</h5>
                        <ButtonSmall text="Ver" />
                    </div>
                </div>

                <div className="box-image-2 hoverImage h-[200px] relative flex justify-center items-center shadow-md shadow-slate-400">
                    <Image
                        className="object-cover w-full h-[300px]"
                        width={300}
                        height={300}
                        src={'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}
                        alt="Image Product"
                    />
                    <div className="absolute bg-black bg-opacity-30 w-full h-full flex flex-col gap-3 justify-center items-center">
                        <p className="text-white w-80 text-center">Save 20%</p>
                        <h5 className="text-2xl font-bold text-white">Special Offer</h5>
                        <ButtonSmall 
                            text="Ver"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}