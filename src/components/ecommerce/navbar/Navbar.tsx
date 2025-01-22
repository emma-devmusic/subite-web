'use client'

import { Suspense, useEffect, useState } from 'react'
import { navigation } from './data'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { AccountMenu } from './AccountMenu'
import { Search } from '../../searching/search/Search'
import { Spinner } from '@/components/spinner/Spinner'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/buttons/Button'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { Notifications } from '@/components/notifications/Notifications'
import { useAppSelector } from '@/store'
import { InstructiveMenu } from './InstructiveMenu'
import Link from 'next/link'

export const Navbar = () => {

    const router = useRouter()
    const pathname = usePathname();
    const { isLogged } = useAppSelector(state => state.auth)
    // const [showNavbar, setShowNavbar] = useState(false);
    // const [isRelative, setIsRelative] = useState(false);

    const handleGoTo = () => {
        router.push('/login')
    }

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollY = window.scrollY;
    //         setShowNavbar(scrollY > 700);
    //         setIsRelative(scrollY <= 200);
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    if (pathname.includes('dashboard')) return

    return (
        <header className="relative bg-white lg:pt-2 z-10 shadow w-full sm:px-4">
            {/* // <header
        //     className={`bg-white lg:pt-2 shadow sm:px-4 transition-all ease-in-out duration-500 top-0 w-full z-40 
        //             ${isRelative ? 'relative !translate-y-0' : 'fixed -translate-y-full'}
        //             ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
        // > */}
            <div className="flex items-center justify-between w-full text-sm font-medium text-white ">
                <div className="flex justify-between items-center mx-auto max-w-[1250px] w-full gap-3">
                    <div className='flex items-center justify-between w-full '>
                        <div className='relative sm:top-0 lg:hidden'>
                            <MobileMenu />
                        </div>
                        <div className='flex flex-row-reverse lg:flex-row items-center justify-between sm:gap-4 w-full'>
                            <div className='flex items-center gap-4'>
                                <div className='relative flex justify-center min-w-[60px] sm:min-w-[128px]'>
                                    <Logo />
                                </div>
                                <div className="hidden lg:flex  h-16 mx-auto items-center justify-center lg:justify-between w-full flex-1 gap-3">
                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className={`flex text-nowrap px-4 py-2 items-center text-sm font-medium text-gray-500 hover:text-secondary transition border-r-2 border-gray-200 ${pathname === page.href ? 'text-primary' : 'text-gray-500'}`}
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                    <InstructiveMenu />
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-4 w-full lg:w-auto'>
                                <div className='flex justify-center w-full max-w-[655px]'>
                                    <Suspense fallback={<Spinner />}>
                                        <Search />
                                    </Suspense>
                                </div>
                                <div className="h-full hidden lg:flex ">
                                    {
                                        isLogged
                                            ?
                                            <div className="flex items-center justify-end gap-3 min-w-[80px]">
                                                <Notifications />
                                                <AccountMenu />
                                            </div>
                                            :
                                            <div className='hidden sm:block'>
                                                <Button
                                                    action={handleGoTo}
                                                    variant='outline-primary'
                                                    text='Ingresar'
                                                    classes='!border-2 !py-[6px] rounded-lg text-secondary group'
                                                    icon={<ArrowRightEndOnRectangleIcon className='text-primary h-6 group-hover:text-white transition-all' />}
                                                />
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
