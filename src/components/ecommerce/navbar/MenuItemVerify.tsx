import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs";
import { useAppSelector } from "@/store";
import { Icon } from "@iconify/react/dist/iconify.js";

export const MenuItemVerify = () => {

    const { userProfile } = useAppSelector(state => state.auth)
    const text = userProfile?.account_verified ? 'Cuenta verificada' : 'Cuenta no verificada'
    const icon = userProfile?.account_verified ? 'simple-line-icons:check' : 'simple-line-icons:exclamation'

    return (
        <li>
            <hr />
            <div className="text-base text-gray-900 font-normal rounded-lg  p-3 cursor-default flex items-center">
                {
                    (userProfile?.auth_user_audits_status_description === 'aprobado')
                        ?
                        <a href={DASHBOARD_BASE_URL + '/user-config'} className="flex items-center">
                            <Icon icon={icon} className='w-3 h-3 text-gray-500' />
                            <i className="ml-1 text-xs text-gray-500">{text}</i>
                        </a>
                        :
                        (userProfile?.auth_user_audits_status_description === 'en proceso')
                            ?
                            <a href={DASHBOARD_BASE_URL + '/user-config'} className="flex items-center">
                                <Icon icon={icon} className='w-3 h-3 text-gray-500' />
                                <i className="ml-1 text-xs text-gray-500">En proceso de verificación</i>
                            </a>
                            :
                            (userProfile?.auth_user_audits_status_description === 'cancelado' || userProfile?.auth_user_audits_status_description === 'pendiente')
                                ?
                                <a href={DASHBOARD_BASE_URL + '/user-config'} className="flex items-center text-yellow-500 gap-3 hover:text-cyan-600 transition-all">
                                    <Icon icon={icon} className='w-5 h-5' />
                                    <p className="">Verificar Cuenta</p>
                                </a>
                                :
                                <a href={DASHBOARD_BASE_URL + '/user-config'} className="flex items-center">
                                    <Icon icon={'material-symbols-light:cancel-outline'} className='w-4 h-4 text-red-500' />
                                    <i className="ml-1 text-xs text-red-500">Cuenta Rechazada</i>
                                </a>
                }

            </div>

        </li>
    );
};
