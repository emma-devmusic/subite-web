'use client'

import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { navigation } from './data'
import { SocialIcons } from '@/components/socialIcons/SocialIcons'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { AccountMenu } from './AccountMenu'
import { Search } from './Search'





export const Navbar = () => {

    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    if (pathname.includes('dashboard')) return

    return (
        <div className="">

            <header className="relative bg-primary mx-4 m-auto rounded-lg shadow">
                <div className="flex h-12 items-center justify-between w-full bg-white px-4 text-sm font-medium text-white sm:px-6 lg:px-44">

                    {/* Logo */}
                    <div className="flex justify-between items-center md:justify-start lg:ml-0 w-full">
                        <button
                            type="button"
                            className="relative rounded-md mr-3  text-white lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <Logo />
                    </div>
                    <div className='hidden md:flex w-full justify-end'>
                        <div className='hidden md:block'>
                            <AccountMenu />
                        </div>
                        <div className='block md:hidden'>
                            <SocialIcons color='white' />
                        </div>
                    </div>
                </div>

                <nav aria-label="Top" className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="flex h-16 items-center justify-center flex-1">

                            <div className="h-full space-x-8 hidden lg:flex">
                                {navigation.pages.map((page) => (
                                    <a
                                        key={page.name}
                                        href={page.href}
                                        className="flex text-nowrap items-center text-sm font-medium text-white hover:text-gray-200 transition"
                                    >
                                        {page.name}
                                    </a>
                                ))}
                            </div>

                            <Search />
                            <div className=" flex items-center justify-end ml-3">
                                <div className='hidden md:block'>
                                    <SocialIcons color='white' />
                                </div>
                                <div className='block md:hidden'>
                                    <AccountMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
