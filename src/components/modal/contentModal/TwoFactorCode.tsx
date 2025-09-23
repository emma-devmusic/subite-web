import { DASHBOARD_BASE_URL } from "@/commons/helpers/envs"
import { useAppForm } from "@/hooks/useAppForm"
import { useAppDispatch, useAppSelector } from "@/store"
import { send_two_factor_code_change } from "@/store/slices/authSlice"

export const TwoFactorCode = () => {

    const { loading, modal: { msg, typeMsg, modalFor } } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const [values, handleInputChange] = useAppForm({
        code: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (modalFor === '2F_code_change') {
            dispatch(
                send_two_factor_code_change(values)
            )
            return
        } else {
            // La autenticación de dos factores para login ahora se maneja desde el dashboard
            console.log('2FA para login debe manejarse desde el dashboard');
            window.location.href = DASHBOARD_BASE_URL + '/login';
        }
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="bg-white p-8 sm:p-6">
                    <div className="">
                        <h4 className="text-lg mb-5 text-center text-cyan-700">Ingresa el código que enviamos a tu email.</h4>
                        <div className='m-3 flex justify-center items-center'>
                            <input
                                value={values.code}
                                onChange={handleInputChange}
                                type="text" name="code" id="code"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block max-w-[250px] p-2.5"
                                placeholder="Ingresa aquí el código"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 px-4 py-4 sm:flex sm:flex-row sm:px-6">
                    <button
                        type="submit"
                        className="w-full min-w-[80px] rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryHover sm:mr-3 sm:w-auto">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}
