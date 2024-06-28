import { useForm } from "@/hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store"
import { email_validation, send_two_factor_code_change, twoFactorAuthentication } from "@/store/authSlice"
import { uiCloseModal } from "@/store/uiSlice"
import { useRouter } from "next/router"

export const TwoFactorCode = () => {


    const { loading, modal: { msg, typeMsg, modalFor } } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const [values, handleInputChange] = useForm({
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
            dispatch(
                twoFactorAuthentication(values)
            )
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block max-w-[250px] p-2.5"
                                placeholder="Ingresa aquí el código"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 px-4 py-4 sm:flex sm:flex-row sm:px-6">
                    <button
                        type="submit"
                        className="w-full min-w-[80px] rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto">
                        Enviar
                    </button>
                </div>
            </form>

        </div>
    )
}
