'use client'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MobileMenu } from './MobileMenu'
import { classNames, navigation } from './data'
import Link from 'next/link'
import { SocialIcons } from '@/components/socialIcons/SocialIcons'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PopoverApp } from '@/components/popover'
import { Logo } from '@/components/logo'





export const Navbar = () => {

    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    if (pathname.includes('dashboard')) return

    return (
        <div className="bg-white">

            {/* Mobile menu */}
            <MobileMenu open={open} setOpen={setOpen} />

            <header className="relative bg-white">
                <div className="flex h-10 items-center justify-between w-full bg-cyan-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">

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
                        <SocialIcons color='white' />
                    </div>
                </div>

                <nav aria-label="Top" className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center justify-center flex-1">


                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">


                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-transparent text-gray-700 hover:text-indigo-600',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-2"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-1"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm z-20 text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            {/* <div className="ml-5 rounded-md absolute max-w-7xl inset-0 top-1/2 bg-white shadow" aria-hidden="true" /> */}

                                                            <div className="mx-auto shadow-md rounded-md relative max-w-7xl bg-white">
                                                                <div className=" max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                        <Image
                                                                                            width={300}
                                                                                            height={300}
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex text-nowrap items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="flex lg:ml-6 w-full max-w-xl text-gray-700">
                                <span className="sr-only">Search</span>
                                <div className='relative w-full flex items-center'>
                                    <MagnifyingGlassIcon className="h-6 w-6 absolute right-3" aria-hidden="true" />
                                    <input type="text" placeholder='Televisor 32"' className='rounded-sm shadow-sm shadow-gray-400 py-2 px-4 w-full outline-slate-300' />
                                </div>
                            </div>
                            <div className="min-w-28 flex items-center justify-end">
                                <PopoverApp
                                    button={<UserCircleIcon />}
                                    classOpen='h-7 w-7 text-indigo-600'
                                    classClose='h-7 w-7 text-gray-400 hover:text-gray-500'
                                >
                                    <ul className='flex flex-col gap-4 text-sm'>
                                        <li className='hover:text-indigo-600'>
                                            <Link href={'/login'}>Ingresar</Link>
                                        </li>
                                        <li className='hover:text-indigo-600'>
                                            <Link href={'/register'}>Regisrarse</Link>
                                        </li>
                                        <li className='hover:text-indigo-600'>
                                            <Link href={'/dashboard'}>Plataforma</Link>
                                        </li>
                                        <li className='hover:text-indigo-600'>
                                            <Link href={'/'}>Cerrar Cuenta</Link>
                                        </li>
                                    </ul>
                                </PopoverApp>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <a href="#" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
