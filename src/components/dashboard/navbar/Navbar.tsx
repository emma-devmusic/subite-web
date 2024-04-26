'use client'

import { useAppDispatch, useAppSelector } from '@/store'
import { uiMenu } from '@/store/ui/uiSlice'
import Image from 'next/image'
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
                     <span className="hidden sm:flex self-center text-cyan-900 whitespace-nowrap">Subastas - Administrador</span>
                  </div>
                  {/* <form action="#" method="GET" className="hidden lg:block lg:pl-32">
                     <label htmlFor="topbar-search" className="sr-only">Search</label>
                     <div className="mt-1 relative lg:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                           </svg>
                        </div>
                        <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                     </div>
                  </form> */}
               </div>
               <div className="flex items-center">
                  {/* <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                     <span className="sr-only">Search</span>
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                     </svg>
                  </button> */}
                  <div className="hidden lg:flex items-center">
                     <span className="text-base font-medium text-gray-600 mr-5">¡Bienvenida, Sara!</span>
                  </div>
                  <div className='notifications text-cyan-600 hover:text-cyan-700 hover:cursor-pointer'>
                     <svg  className="mr-5 h-7 w-7" height={'2rem'} width={'2rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m9.75-17.81l-1.42 1.42A8.98 8.98 0 0 1 21 11h2c0-2.93-1.16-5.75-3.25-7.81M1 11h2c0-2.4.96-4.7 2.67-6.39L4.25 3.19A10.96 10.96 0 0 0 1 11"></path></svg>
                  </div>
                  <Image width={300} height={300} className="h-10 w-10 rounded-full " src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil Sims avatar" />
                  {/* <div className="inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 hover:cursor-pointer focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                     <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <defs>
                           <mask id="ipSConfig0">
                              <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                                 <path fill="#fff" stroke="#fff" d="m24 4l-6 6h-8v8l-6 6l6 6v8h8l6 6l6-6h8v-8l6-6l-6-6v-8h-8z"></path>
                                 <path fill="#000" stroke="#000" d="M24 30a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"></path>
                              </g>
                           </mask>
                        </defs>
                        <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSConfig0)"></path>
                     </svg>
                     Cuenta
                  </div> */}
               </div>
            </div>
         </div>
      </nav>
   )
}
