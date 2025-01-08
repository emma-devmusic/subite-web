
import { ButtonMenu } from '@/components/buttons'
import { WelcomeMessage } from '.';
import { AccountMenu } from '@/components/ecommerce/navbar/AccountMenu';
import { Notifications } from '@/components/notifications/Notifications';
import { Logo } from '@/components/logo';

export const Navbar = () => {


   return (
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
         <div className="px-3 py-3 lg:px-5 lg:pl-3 lg:py-4">
            <div className="flex items-center justify-between h-15">
               <div className="flex items-center justify-start">
                  <ButtonMenu />
                  <div className="text-xl font-bold flex items-center lg:ml-2.5">
                     <Logo onlyHammer hammerClass='!h-[38px] mr-4' />
                     <span className={`hidden sm:flex self-center text-cyan-900 whitespace-nowrap`}>Bienvenido/a</span>
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
