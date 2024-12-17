
import { ButtonMenu } from '@/components/buttons'
import Image from 'next/image'
import { WelcomeMessage } from '.';
import { AccountMenu } from '@/components/ecommerce/navbar/AccountMenu';
import { Notifications } from '@/components/notifications/Notifications';

export const Navbar = () => {


   return (
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
         <div className="px-3 py-3 lg:px-5 lg:pl-3 lg:py-4">
            <div className="flex items-center justify-between h-15">
               <div className="flex items-center justify-start">
                  <ButtonMenu />
                  <div className="text-xl font-bold flex items-center lg:ml-2.5">
                     <Image width={48} height={48} src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 w-auto mr-2 hidden lg:block" alt="Windster Logo" />
                     <span className="hidden sm:flex self-center text-cyan-900 whitespace-nowrap">Administrador</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <WelcomeMessage />
                  <Notifications />
                  <AccountMenu />
               </div>
            </div>
         </div>
      </nav>
   )
}
