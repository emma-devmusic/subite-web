import { BannerLayout } from '@/components/banners/BannerLayout'
import React from 'react'
import img from '../../../assets/img/bg-login.jpg'
import { league_spartan } from '@/app/layout'
export const OurMission = () => {
    return (
        <section className=''>
            <BannerLayout img={img}>
                <div className='flex flex-col justify-center h-full'>
                    <h2 className={`${league_spartan.className} text-white text-4xl mb-4 sm:mb-12 text-center sm:text-5xl md:text-6xl`}>Nuestra <strong className={`text-primary`}>Misión</strong></h2>
                    <p className="text-xs sm:text-xl text-center">
                        Facilitar el proceso de compra y venta mediante subastas en línea, brindando una experiencia accesible, transparente y segura para nuestros usuarios.
                    </p>
                </div>
            </BannerLayout>
        </section>
    )
}
