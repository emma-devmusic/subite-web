'use client'

import { Suspense } from 'react'
import { navigation } from './data'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'
import { AccountMenu } from './AccountMenu'
import { Search } from './Search'
import { Spinner } from '@/components/spinner/Spinner'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/buttons/Button'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { Notifications } from '@/components/notifications/Notifications'
import { useAppSelector } from '@/store'

export const Navbar = () => {


    const { isLogged } = useAppSelector(state => state.auth)
    const router = useRouter()
    const handleGoTo = () => {
        router.push('/login')
    }
    const pathname = usePathname();
    if (pathname.includes('dashboard')) return

    return (
        <div className="mx-4">
            <header className="relative bg-white rounded-lg shadow container mx-auto w-full max-w-[1350px] px-4">
                <div className="flex mx-auto items-center justify-between w-full text-sm font-medium text-white max-w-[1300px]">
                    <div className="flex justify-between items-center  w-full gap-3">
                        <div className='flex items-center justify-between w-full lg:w-auto '>
                            <div className='relative top-[6px] sm:top-0 lg:hidden'>
                                <MobileMenu />
                            </div>
                            <div className='hidden sm:flex items-end w-full justify-center lg:hidden'>
                                <Suspense fallback={<Spinner />}>
                                    <Search />
                                </Suspense>
                            </div>
                            <div className='relative top-[6px] min-w-[128px]'>
                                <Logo />
                            </div>
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
                                            classes='!border-2 rounded-lg text-secondary group'
                                            icon={<ArrowRightEndOnRectangleIcon className='text-primary h-6 group-hover:text-white transition-all' />}
                                        />
                                    </div>
                            }
                        </div>
                    </div>
                </div>

                <nav aria-label="Top" className="max-w-full sm:hidden lg:block">
                    <div className="flex h-16 mx-auto items-center justify-center lg:justify-between w-full max-w-[1300px] flex-1 gap-3">
                        <div className="hidden lg:flex ">
                            {navigation.pages.map((page) => (
                                <a
                                    key={page.name}
                                    href={page.href}
                                    className="flex text-nowrap px-4 py-2 items-center text-sm font-medium text-gray-500 hover:text-secondary transition border-r-2 border-gray-200 last-of-type:border-none"
                                >
                                    {page.name}
                                </a>
                            ))}
                        </div>
                        <div className='flex sm:hidden lg:flex items-center justify-center lg:justify-end w-full gap-2 max-w-[655px]'>
                            <Suspense fallback={<Spinner />}>
                                <Search />
                            </Suspense>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
