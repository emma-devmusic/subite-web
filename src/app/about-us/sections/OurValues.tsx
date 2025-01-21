import { Card } from '@/components/cards/Card'
import { IconTitleText } from '@/components/dataShow/IconTitleText'
import { CubeTransparentIcon, HeartIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const OurValues = () => {
    return (
        <section>
            <div className='flex flex-col xl:flex-row gap-4 justify-center'>
                <div className='flex flex-col sm:flex-row gap-4 w-fit mx-auto'>
                    <Card className='p-10 px-14 bg-opacity-25 transition-all hover:shadow-lg hover:shadow-[#add8e691] hover:-translate-y-[1px]'>
                        <IconTitleText
                            icon={<CubeTransparentIcon className='text-[#ADD8E6]' style={{filter: 'drop-shadow(0px 0px 6px #ADD8E6)'}} />}
                            title='Transparencia'
                            text='Ofrecemos un proceso de subasta claro y justo para todos los participantes.'
                        />
                    </Card>
                    <Card className='p-10 px-14 bg-opacity-25 transition-all hover:shadow-lg hover:shadow-[#a1acb79a] hover:-translate-y-[1px]'>
                        <IconTitleText
                            icon={<ShieldCheckIcon className='text-[#a1acb7]' style={{filter: 'drop-shadow(0px 0px 6px #a1acb7)'}}/>}
                            title='Seguridad'
                            text='Protegemos tus datos y transacciones con tecnología de vanguardia.'
                        />
                    </Card>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 w-fit mx-auto'>
                    <Card className='p-10 px-14 bg-opacity-25 transition-all hover:shadow-lg hover:shadow-[#6a0dad39] hover:-translate-y-[1px]'>
                        <IconTitleText
                            icon={<LightBulbIcon className='text-[#6A0DAD]' style={{filter: 'drop-shadow(0px 0px 6px #6A0DAD)'}}/>}
                            title='Innovación'
                            text='Innovamos constantemente para mejorar la experiencia de usuario.'
                        />
                    </Card>
                    <Card className='p-10 px-14 bg-opacity-25 transition-all hover:shadow-lg hover:shadow-[#50c8783f] hover:-translate-y-[1px]'>
                        <IconTitleText
                            icon={<HeartIcon className='text-[#50C878]' style={{filter: 'drop-shadow(0px 0px 6px #50C878)'}}/>}
                            title='Compromiso'
                            text='Estamos siempre disponibles para ayudarte y resolver tus inquietudes.'
                        />
                    </Card>
                </div>
            </div>
        </section>
    )
}
