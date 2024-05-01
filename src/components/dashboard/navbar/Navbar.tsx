'use client'

import { PopoverApp } from '@/components/popover'
import { useAppDispatch, useAppSelector } from '@/store'
import { uiMenu } from '@/store/ui/uiSlice'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

export const Navbar = () => {

   const { menuOpen } = useAppSelector(state => state.iu)

   const dispatch = useAppDispatch()

   const handleToggleMenu = () => {
      dispatch(uiMenu(!menuOpen))
   }

   return (
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
         <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
               <div className="flex items-center justify-start">
                  <button
                     id="toggleSidebarMobile"
                     aria-expanded="true"
                     aria-controls="sidebar"
                     className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                     onClick={handleToggleMenu}
                  >
                     <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                     </svg>
                     <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                     </svg>
                  </button>
                  <div className="text-xl font-bold flex items-center lg:ml-2.5">
                     <Image width={40} height={40} src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                     <span className="hidden sm:flex self-center text-cyan-900 whitespace-nowrap">Administrador</span>
                  </div>
               </div>
               <div className="flex items-center">
                  <div className="hidden lg:flex items-center">
                     <span className="text-base font-medium text-gray-600 mr-5">¡Bienvenida, Sara!</span>
                  </div>

                  <PopoverApp
                     button={ <BellAlertIcon /> }
                     classOpen='w-8 mr-4 text-cyan-800'
                     classClose='text-cyan-600 hover:text-cyan-700 hover:cursor-pointer w-8 mr-4'
                     position='end'
                  >
                     <ul className='flex flex-col gap-5'>
                        <li>
                           <Link href={'#'}>Notif 1</Link>
                        </li>
                        <li>
                           <Link href={'#'}>Notif 1</Link>
                        </li>
                     </ul>
                  </PopoverApp>
                  <PopoverApp 
                     button={ <Image width={300} height={300} className="h-10 w-10 rounded-full " src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil Sims avatar" /> }
                     classClose=''
                     classOpen=''
                     position='end'
                  >  
                     <ul className='flex flex-col gap-5'>
                        <li>
                           <Link href={'/'}>Ir al Sitio Web.</Link>
                        </li>
                        <li>
                           <Link href={'#'}>Cerrar Sesión</Link>
                        </li>
                     </ul>

                  </PopoverApp>

                  
               </div>
            </div>
         </div>
      </nav>
   )
}
