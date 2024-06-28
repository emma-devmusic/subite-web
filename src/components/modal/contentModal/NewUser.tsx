import { Spinner } from "@/components/spinner/Spinner"
import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store"
import { Message } from "./Message";
import { uiCloseModal } from "@/store/uiSlice";
import { email_validation } from "@/store/authSlice";
import { useRouter } from 'next/navigation'

export const NewUser = () => {

    const router = useRouter()
    const { loading, modal: { msg, typeMsg, modalFor } } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const [values, handleInputChange] = useForm({
        email: '',
        code: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            email_validation(values)
        )
    }

    const handleRedirectLogin = () => {
        dispatch(uiCloseModal())
        if (typeMsg === 'success') router.push('/login')
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
                    <div className='m-3 flex justify-center items-center min-h-[200px]'>
                        {
                            loading
                                ? <Spinner />
                                : (msg && modalFor !== 'validate_code')
                                    ? <Message msg={msg} typeMsg={typeMsg} />
                                    : <div className="flex flex-col gap-3">
                                        <div>
                                            <h4 className="text-2xl mb-5 text-center text-cyan-700">¡Revisa tu Correo Electrónico!</h4>
                                            <p className="text-center">
                                                {msg ? msg : 'Hemos enviado un código de validación a tu correo electrónico para que puedas ingresar a la plataforma.'}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex flex-col gap-3 items-center justify-center">
                                            <input
                                                value={values.email}
                                                onChange={handleInputChange}
                                                type="email" name="email" id="email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block max-w-[250px] p-2.5"
                                                placeholder="Ingresa tu correo electrónico"
                                                required
                                            />
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

                        }
                    </div>
                </div>
                <div className="bg-gray-100 px-4 py-4 pb-6 sm:flex sm:flex-row sm:px-6">
                    {
                        msg
                            ? <button className="w-full min-w-[80px] rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto"
                                onClick={handleRedirectLogin}
                            >OK</button>
                            : <>
                                <button
                                    type="submit"
                                    className="w-full min-w-[80px] rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto">
                                    Enviar
                                </button>
                            </>
                    }

                </div>
            </form>
        </>
    )
}
