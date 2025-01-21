import React, { ReactNode } from 'react'
import Image, { StaticImageData } from 'next/image'
import img1 from '../../../assets/img/about/about-1.jpg'

interface Props {
    children: ReactNode;
    img: StaticImageData;
}

export const BannerLayout = ({ children, img }: Props) => {
    return (
        <div className="relative flex flex-col">
            <div className='!rounded-lg overflow-hidden max-w-[1350px] min-h-[350px] h-full max-h-[450px] w-full'>
                <Image src={img} width={1280} height={400} className="min-h-[350px] object-cover mx-auto z-0" alt="Equipo de TuNombreDeSubasta trabajando juntos" />
            </div>
            <div className='absolute rounded-lg z-10 w-full h-full bg-black bg-opacity-50 text-white'>
                <div className='max-w-[700px] mx-auto p-4 sm:p-12 h-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}
