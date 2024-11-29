'use client'
import { Fragment, useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MobileMenu } from './MobileMenu'
import { classNames, navigation } from './data'
import Link from 'next/link'
import { SocialIcons } from '@/components/socialIcons/SocialIcons'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PopoverApp } from '@/components/popover'
import { Logo } from '@/components/logo'
import { AccountMenu } from './AccountMenu'





export const Navbar = () => {

    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    if (pathname.includes('dashboard')) return

    return (
        <div className="bg-white">

            <header className="relative bg-[#ff8232]">
                <div className="flex h-12 items-center justify-between w-full bg-white px-4 text-sm font-medium text-white sm:px-6 lg:px-8">

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
                                        className="flex text-nowrap items-center text-sm font-medium text-white hover:text-indigo-600"
                                    >
                                        {page.name}
                                    </a>
                                ))}
                            </div>

                            <div className="flex lg:ml-6 w-full max-w-xl text-gray-700">
                                <span className="sr-only">Search</span>
                                <div className='relative w-full flex items-center'>
                                    <MagnifyingGlassIcon className="h-6 w-6 absolute right-3" aria-hidden="true" />
                                    <input type="text" placeholder='Televisor 32"' className='rounded-sm shadow-sm shadow-gray-400 py-2 px-4 w-full outline-slate-300' />
                                </div>
                            </div>
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
