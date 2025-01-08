import { SocialIcons } from '@/components/socialIcons/SocialIcons'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className='mx-4'>
            <footer className="bg-white max-w-[1350px] mx-auto md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-8 my-6">
                <ul className="flex items-center flex-wrap mb-6 md:mb-0">
                    <li><a href="#" className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6">Licencia</a></li>
                    <li><a href="#" className="text-sm font-normal text-gray-500 hover:underline">Soporte</a></li>
                </ul>
                <SocialIcons color='primary' />
            </footer>
            <p className="text-center text-sm text-gray-500 my-10">
                © 2024 <a href="https://themesberg.com" className="hover:underline" target="_blank">Subite Subastas</a>. All rights reserved. <i>Powered by <Link href={'https://ding.com.ar/'} target='_blank' className='text-blue-700'>Ding</Link></i>
            </p>
        </div>
    )
}