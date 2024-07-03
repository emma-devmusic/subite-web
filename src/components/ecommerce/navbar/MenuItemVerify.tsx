import { useAppSelector } from "@/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export const MenuItemVerify = () => {

    const { isLogged, userProfile } = useAppSelector(state => state.auth)
    const text = userProfile?.account_verified ? 'Cuenta verificada' : 'Cuenta no verificada'
    const icon = userProfile?.account_verified ? 'simple-line-icons:check' : 'simple-line-icons:exclamation'

    return (
        <li>
            <hr />
            <div className="text-base text-gray-900 font-normal rounded-lg  p-3 cursor-default flex justify-center items-center">
                {
                    userProfile?.account_verified
                        ?
                        <div className="">
                            <Icon icon={icon} className='w-3 h-3 text-gray-500' />
                            <i className="ml-1 text-xs text-gray-500">{text}</i>
                        </div>
                        :
                        <>
                            {/* <i className="ml-1 text-xs text-gray-500">{text}</i> */}
                            <Link href={'/dashboard/user-config'} className="flex items-center text-yellow-500 gap-1 uppercase hover:text-cyan-600 transition-all">
                                <Icon icon={icon} className='w-5 h-5' />
                                <p className="">Verificar Cuenta</p>
                            </Link>
                        </>
                }

            </div>

        </li>
    );
};
