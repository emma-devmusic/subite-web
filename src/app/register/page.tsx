'use client'
import Link from "next/link";
import styles from './register.module.css';
import { useForm } from "@/hooks/useForm";
import { CreateUserData } from "@/types";
import { useAppDispatch } from "@/store";
import { registerUser } from "@/store/authSlice";

export default function RegisterPage() {

    const dispatch = useAppDispatch()

    const [values, handleInputChange, reset] = useForm({
        name: "",
        last_name: "",
        email: "",
        password: "",
        password2: "",
        dni: "",
        cell_phone: "",
        cell_phone_secondary: "",
        address: "",
        age: "",
        gender_type: 0,
        two_factor_enabled: false
    } as CreateUserData)

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch( registerUser( values ) )
    }

    return (
        <div className={`mx-auto flex justify-center items-center px-5 pt-4 pb-4  overflow-auto ${styles.image}`}>

            <div className="py-6 px-8 w-full bg-white shadow-lg rounded-lg sm:max-w-screen-lg">

                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Crea tu Cuenta Gratis!
                </h2>

                <hr className="mt-4" />

                <form className="mt-8" action="#" onSubmit={handleSubmit}>
                    <div className="columns-1 md:columns-2 gap-7">
                        <div className="">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Nombre</label>
                            <input value={values.name} onChange={handleInputChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="last_name" className="text-sm font-medium text-gray-900 block mb-2">Apellido</label>
                            <input value={values.last_name} onChange={handleInputChange} type="text" name="last_name" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                            <input value={values.email} onChange={handleInputChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Contraseña</label>
                            <input value={values.password} onChange={handleInputChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password2" className="text-sm font-medium text-gray-900 block mb-2">Ingresá Nuevamente tu Contraseña</label>
                            <input value={values.password2} onChange={handleInputChange} type="password" name="password2" id="password2" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="dni" className="text-sm font-medium text-gray-900 block mb-2">DNI</label>
                            <input value={values.dni} onChange={handleInputChange} type="text" name="dni" id="dni" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="cell_phone" className="text-sm font-medium text-gray-900 block mb-2">Teléfono</label>
                            <input value={values.cell_phone} onChange={handleInputChange} type="text" name="cell_phone" id="cell_phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="cell_phone_secondary" className="text-sm font-medium text-gray-900 block mb-2">Segundo Teléfono</label>
                            <input value={values.cell_phone_secondary} onChange={handleInputChange} type="text" name="cell_phone_secondary" id="cell_phone_secondary" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="address" className="text-sm font-medium text-gray-900 block mb-2">Dirección</label>
                            <input value={values.address} onChange={handleInputChange} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="age" className="text-sm font-medium text-gray-900 block mb-2">Edad</label>
                            <input value={values.age} onChange={handleInputChange} type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="gender_type" className="text-sm font-medium text-gray-900 block mb-2">Género</label>
                            <select onChange={handleInputChange} defaultValue={'no_select'} name="gender_type" id="gender_type" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                                <option value="no_select">Prefiero no seleccionar</option>
                                <option className="hover:bg-cy" value="1">Hombre</option>
                                <option className="hover:bg-cy" value="2">Mujer</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="two_factor_enabled" className="text-sm font-medium text-gray-900 block mb-2">Autenticación en 2 factores</label>
                            <select value={values.two_factor_enabled} onChange={handleInputChange} name="two_factor_enabled" id="two_factor_enabled" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 my-6">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input value={values.items} onChange={handleInputChange} id="remember" aria-describedby="remember" name="remember" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" required />
                            </div>
                            <div className="text-sm ml-3">
                                <label htmlFor="remember" className="font-medium text-gray-900">Acepto los <a href="#" className="text-teal-500 hover:underline">Términos y Condiciones</a> del servicio</label>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                        >
                                Create account
                        </button>
                        <div className="text-sm font-medium text-gray-500">
                            ¿Ya tienes una cuenta? <Link href="/login" className="text-teal-500 hover:underline">Ingresá</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}