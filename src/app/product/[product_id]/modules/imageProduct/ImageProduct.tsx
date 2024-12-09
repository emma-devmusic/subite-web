'use client'
import Image from 'next/image';
import Slider from 'react-slick';
import Zoom from 'react-medium-image-zoom';
import { ProductImageProductSearchIDResponse } from '@/types/products';
import 'react-medium-image-zoom/dist/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './img-product.css';

interface Props {
    productImages: ProductImageProductSearchIDResponse[];
}

export const ImageProduct = ({ productImages }: Props) => {

    const settings = {
        customPaging: function (i: any) {
            return (
                <a>
                    <img src={`${productImages[i].url_image}`} alt='imagen de producto para ver' />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={`slider-container h-full ${productImages.length > 1 && 'mb-20'} px-7`}>
            {productImages.length === 1 ? (
                <Zoom>
                    <div className='flex items-center'>
                        <Image
                            src={productImages[0].url_image}
                            width={1024}
                            height={600}
                            className="max-h-[600px] object-contain w-full cursor-pointer"
                            alt='Imagen del producto'
                        />
                    </div>
                </Zoom>
            ) : (
                <Slider {...settings}>
                    {productImages.map((imageProduct, index) => (
                        <div key={index} className='flex items-center'>
                            <Zoom>
                                <Image
                                    src={imageProduct.url_image}
                                    width={1024}
                                    height={600}
                                    className="max-h-[600px] object-contain w-full cursor-pointer"
                                    alt='Imagen del producto'
                                />
                            </Zoom>
                        </div>
                    ))}
                </Slider>
            )}

        </div >
    );
};