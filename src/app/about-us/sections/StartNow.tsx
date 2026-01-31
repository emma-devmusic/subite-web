
import { APP_BASE_URL } from '@/commons/helpers/envs'
import { Button } from '@/components/buttons/Button'
import { P } from '@/components/text/P'
import { SectionHeading } from '@/components/text/SectionHeading'
import Link from 'next/link'
import React from 'react'

export const StartNow = () => {


    return (
        <section>
            <hr />
            <div className='flex flex-col justify-center items-center my-24'>
                <SectionHeading
                    heading='¡Comienza Ahora!'
                />
                <P className='max-w-[700px] text-center'>¡El momento de aprovechar el mundo de las subastas es ahora! Encuentra productos únicos, haz ofertas en tiempo real y también subasta lo que quieras. Todo en un solo lugar, con seguridad y transparencia garantizadas.</P>
                <a href={`${APP_BASE_URL}/register`}>
                    <Button
                        text='¡Registrarme!'
                        variant='outline-primary'
                        classes='!mt-10'
                    />
                </a>
            </div>
            <hr />
        </section>
    )
}
