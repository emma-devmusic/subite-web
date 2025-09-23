import React from 'react'
import iconAuctionImage from '../../../assets/img/iconsImages/icon-auction.png'
import iconBuyImage from '../../../assets/img/iconsImages/icon-buy.png'
import img1 from '../../../assets/img/about/about-1.jpg'
import img2 from '../../../assets/img/about/about-2.jpg'
import img3 from '../../../assets/img/about/about-3.jpg'
import Image from 'next/image'
import { league_spartan } from '@/app/fonts'
import { SectionHeading } from '@/components/text/SectionHeading'
import { TinyHead } from '@/components/text/TinyHead'
import { P } from '@/components/text/P'
import { IconTitleText } from '@/components/dataShow/IconTitleText'

export const WhoWeAre = () => {

    return (
        <section id="about-us-content">
            <div className='flex flex-col items-center gap-16 lg:flex-row lg:gap-8 justify-center'>
                <div className='flex flex-col gap-2 w-auto'>
                    <div className='flex gap-2'>
                        <div className='relative flex flex-col justify-center items-center bg-orange-500 text-white  w-full h-full max-w-72 max-h-72 md:w-72  md:h-72 rounded-xl overflow-hidden  translate-x-16 translate-y-16'>
                            <Image src={img1} width={600} height={600} className="object-cover opacity-15" alt="Equipo de TuNombreDeSubasta trabajando juntos" />
                            <div className='absolute z-10 text-center'>
                                <h3 className={`text-4xl sm:text-7xl ${league_spartan.className}`}>23</h3>
                                <p className={`text-xs sm:text-xl mt-1 ${league_spartan.className}`}>Años de experiencias</p>
                            </div>
                        </div>
                        <div className=' w-full h-full max-w-72 max-h-72 md:w-72  md:h-72 rounded-xl overflow-hidden'>
                            <Image src={img1} width={600} height={600} className="object-cover" alt="Equipo de TuNombreDeSubasta trabajando juntos" />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className=' w-full h-full max-w-72 max-h-72 md:w-72  md:h-72 rounded-xl overflow-hidden'>
                            <Image src={img2} width={600} height={600} className="object-cover" alt="Equipo de TuNombreDeSubasta trabajando juntos" />
                        </div>
                        <div className=' w-full h-full max-w-72 max-h-72 md:w-72  md:h-72 rounded-xl overflow-hidden'>
                            <Image src={img3} width={600} height={600} className="object-cover" alt="Equipo de TuNombreDeSubasta trabajando juntos" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center max-w-[600px]'>
                    <div className=''>
                        <TinyHead
                            text='Sobre nosotros'
                        />
                    </div>
                    <SectionHeading
                        heading='¿Quienes Somos?'
                    />
                    <P>En <strong className="text-primary">Subite.com</strong>, conectamos compradores y vendedores a través de una plataforma de subastas en línea confiable. Nos destacamos por nuestra transparencia, seguridad y compromiso con nuestros usuarios.</P>
                    <div className='flex gap-3 justify-center mt-4'>
                        <div className='p-2'>
                            <IconTitleText
                                icon={
                                    <Image src={iconAuctionImage} width={150} height={150} alt='icono de subasta' className='h-28 w-28 ' />
                                }
                                text='Clita erat ipsum et lorem et sit, sed stet lorem sit clita'
                                title='Subastá Rápido'
                            />
                        </div>
                        <div className='p-2'>
                            <IconTitleText
                                icon={
                                    <Image src={iconBuyImage} width={150} height={150} alt='icono de subasta' className='h-28 w-28 opacity-90' />
                                }
                                text='Clita erat ipsum et lorem et sit, sed stet lorem sit clita'
                                title='Compra Ágil'
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
