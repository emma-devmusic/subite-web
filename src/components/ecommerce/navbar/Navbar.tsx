
import { Suspense } from 'react'
import { navigation, navigationMobile } from './data'
import { usePathname } from 'next/navigation'
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
import { DASHBOARD_BASE_URL } from '@/commons/helpers/envs'
import { OffCanvas } from '@/components/OffCanvas/OffCanvas'
import { accountMenuData } from '@/mocks/mocks'
import { Icon } from '@iconify/react'

export const Navbar = () => {

    const pathname = usePathname();
    const { isLogged } = useAppSelector(state => state.auth)

    const handleGoTo = () => {
        window.location.href = DASHBOARD_BASE_URL + '/login';
    }

    return (
        <>
            <OffCanvas
                canvasId="navbar-mobile"
                title="Subite a tus subastas"
            >
                <div className="flex flex-col gap-4">
                    {navigationMobile(isLogged).pages.map((navItem, index) => (
                        <Link
                            key={index}
                            href={navItem.href}
                            className={`hover:text-primary transition-all ${navItem.name === 'Ingresar' ? 'bg-primary text-white px-2 py-2 rounded-md text-center' : 'text-gray-600'} ${pathname === navItem.href ? 'text-primary' : 'text-gray-500'}`}
                        >
                            {navItem.name}
                        </Link>
                    ))}
                </div>
                {/* Cuenta de usuario en móvil - items directos sin popover */}
                {isLogged ? (
                    <div className="border-t pt-4 mt-2 flex flex-col gap-3">
                        <p className="text-xs text-gray-400 uppercase font-semibold">Mi Cuenta</p>
                        {accountMenuData
                            .filter(item => item.isLogged === true)
                            .map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="flex items-center gap-3 text-gray-600 hover:text-primary transition-all"
                                >
                                    <Icon icon={item.icon} className="text-xl" />
                                    {item.text}
                                </a>
                            ))
                        }
                    </div>
                ) : (
                    <Link
                        href={DASHBOARD_BASE_URL + '/login'}
                        className="block mt-4 bg-primary text-white px-4 py-2 rounded-md text-center"
                    >
                        Ingresar
                    </Link>
                )}
            </OffCanvas>
            <header className="relative bg-white lg:pt-2 z-[100] shadow w-full sm:px-4">
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
                                <div className="hidden lg:flex  h-16 mx-auto items-center justify-center lg:justify-between w-full flex-1">
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
                                {/* Notificaciones visibles en móvil cuando está logueado */}
                                {isLogged && (
                                    <div className="flex lg:hidden">
                                        <Notifications />
                                    </div>
                                )}
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
        </>
    )
}
