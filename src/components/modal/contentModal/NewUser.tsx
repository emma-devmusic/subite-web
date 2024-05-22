import { Spinner } from "@/components/spinner/Spinner"
import { useForm } from "@/hooks/useForm";
import { useAppSelector } from "@/store"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useState } from 'react';


export const NewUser = () => {

    const { loading } = useAppSelector(state => state.ui)

    const [values, handleInputChange, reset] = useForm({
        code: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(values)
    }
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
                    <div className="">
                        <div className=''>
                            <div className='flex justify-between items-center mb-3'>
                                <h2 className='text-xl'>Código de Verificación</h2>
                            </div>
                            <hr />
                        </div>
                        <div className='m-3 flex justify-center items-center min-h-[200px]'>
                            {
                                loading
                                    ? <Spinner />
                                    : <div className="flex flex-col gap-3">
                                        {/* <div className="flex items-center gap-2">
                                            <CheckCircleIcon className=" h-8 w-8 text-green-400" />
                                            <h4>¡Código enviado con éxito!</h4>
                                        </div> */}
                                        <div>
                                            <h4 className="text-2xl mb-5 text-center text-cyan-700">¡Revisa tu Correo Electrónico!</h4>
                                            <p className="text-center">Hemos enviado un código de validación a tu correo electrónico para que puedas ingresar a la plataforma.</p>
                                        </div>
                                        <div className="mt-5">
                                            {/* <label htmlFor="code" className="text-sm  text-gray-900 block mb-2">Ingresa el Código de Validación:</label> */}
                                            <input value={values.code} onChange={handleInputChange} type="text" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ingresa aquí el código" required />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 pb-6 sm:flex sm:flex-row sm:px-6">
                    <button type="submit" className="w-full rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:mr-3 sm:w-auto">Enviar</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
                </div>
            </form>
        </>
    )
}
