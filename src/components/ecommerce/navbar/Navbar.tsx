'use client'

import { Suspense } from 'react'
import { navigation } from './data'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { AccountMenu } from './AccountMenu'
import { Search } from './Search'
import { Spinner } from '@/components/spinner/Spinner'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/buttons/Button'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'

export const Navbar = () => {

    const pathname = usePathname();
    if (pathname.includes('dashboard')) return

    return (
        <div className="mx-4">
            <header className="relative bg-white rounded-lg shadow container mx-auto w-full max-w-[1350px] px-4">
                <div className="flex mx-auto items-center justify-between w-full text-sm font-medium text-white max-w-[1300px]">
                    <div className="flex justify-between items-center  w-full gap-3">
                        <div className='flex items-center justify-between w-full'>
                            <div className='lg:hidden'>
                                <MobileMenu />
                            </div>
                            <Logo />
                        </div>
                        <div className="h-full space-x-8 hidden lg:flex">
                            <div className='hidden sm:block'>
                                <Button
                                    variant='outline-primary'
                                    text='Ingresar'
                                    classes='!border-2 rounded-lg text-secondary'
                                    // icon={<ArrowRightEndOnRectangleIcon className='text-primary h-6' />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Top" className="max-w-full ">
                    <div className="flex h-16 mx-auto items-center justify-center lg:justify-between w-full max-w-[1300px] flex-1 gap-3">
                        <div className="h-full space-x-8 hidden lg:flex">
                            {navigation.pages.map((page) => (
                                <a
                                    key={page.name}
                                    href={page.href}
                                    className="flex text-nowrap items-center text-sm font-medium text-gray-500 hover:text-secondary transition"
                                >
                                    {page.name}
                                </a>
                            ))}
                        </div>
                        <div className='flex justify-between items-center w-full gap-2 max-w-[615px]'>
                            <div className='w-full max-w-[576px]'>
                                <Suspense fallback={<Spinner />}>
                                    <Search />
                                </Suspense>
                            </div>
                            <div className="flex items-center justify-end min-w-[40px]">
                                <AccountMenu />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
