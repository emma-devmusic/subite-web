import { Spinner } from "@/components/spinner/Spinner"
import { useAppForm } from "@/hooks/useAppForm";
import { useAppDispatch, useAppSelector } from "@/store"
import { validate_email } from "@/store/slices/authSlice";
import { useRouter } from 'next/navigation'


export const ValidateNewEmail = () => {
    const router = useRouter()
    const { loading, modal: { msg, typeMsg, modalFor } } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()
    const [values, handleInputChange] = useAppForm({
        email: '',
        code: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            validate_email(values)
        )
    }



    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
                <div className='m-3 flex justify-center items-center min-h-[200px]'>
                    <div className="flex flex-col gap-3">
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
                </div>

            </div>
            <div className="bg-gray-100 px-4 py-4 pb-6 sm:flex sm:flex-row sm:px-6">
                <button
                    type="submit"
                    className="w-full min-w-[80px] rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto">
                    Enviar
                </button>
            </div>

        </form>

    );
};
