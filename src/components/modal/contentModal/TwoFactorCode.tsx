import { useForm } from "@/hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store"
import { email_validation, twoFactorAuthentication } from "@/store/authSlice"
import { uiCloseModal } from "@/store/uiSlice"
import { useRouter } from "next/router"

export const TwoFactorCode = () => {

    // const router = useRouter()
    const { loading, modal: { msg, typeMsg } } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const [values, handleInputChange] = useForm({
        code: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            twoFactorAuthentication( values )
        )
    }

    // const handleRedirectLogin = () => {
    //     dispatch(uiCloseModal())
    //     if (typeMsg === 'success') router.push('/login')
    // }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
                    <div className="">
                        <div className=''>
                            <div className='flex justify-between items-center mb-3'>
                                <h2 className='text-xl'>Autenticación en 2 Pasos</h2>
                            </div>
                            <hr />
                        </div>
                        <div className="mt-8">
                            <h4 className="text-lg mb-5 text-center text-cyan-700">Ingresa el código que enviamos a tu email.</h4>
                        </div>
                        <div className='m-3 flex justify-center items-center mb-8'>
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
