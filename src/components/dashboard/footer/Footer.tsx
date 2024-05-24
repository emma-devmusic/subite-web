import { SocialIcons } from '@/components/socialIcons/SocialIcons'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div>
            <footer className="bg-white md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4">
                <ul className="flex items-center flex-wrap mb-6 md:mb-0">
                    <li><a href="#" className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6">Licencia</a></li>
                    <li><a href="#" className="text-sm font-normal text-gray-500 hover:underline">Soporte</a></li>
                </ul>
                <SocialIcons color='grey-500' />
            </footer>
            <p className="text-center text-sm text-gray-500 my-10">
                © 2024 <a href="https://themesberg.com" className="hover:underline" target="_blank">Subastas App</a>. All rights reserved. <i>Powered by <Link href={'https://ding.com.ar/'} target='_blank' className='text-blue-700'>Ding</Link></i>
            </p>
        </div>
    )
}