import Image from "next/image";
import Link from "next/link";
import styles from './register.module.css';

export default function RegisterPage() {

    return (
        <div className="mx-auto flex justify-center items-center px-5 pt-4 pb-4  overflow-auto">

            <div className={`${styles.image} bg-white shadow-md rounded-lg md:mt-0 w-full min-h-[700px] md:min-h-full  md:h-full sm:max-w-screen-lg flex flex-col md:flex-row justify-between items-center xl:p-0 `}>

                <div className="basis-3/6 shadow-md"></div>
            
                <div className="p-6 w-full  bg-white md:basis-3/6 rounded-b-lg md:rounded-e-lg md:rounded-none">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Crea tu Cuenta Gratis!
                    </h2>
                    <form className="mt-8 space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="name@company.com" required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required/>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-900 block mb-2">Confirmar Contraseña</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" required/>
                            </div>
                            <div className="text-sm ml-3">
                                <label htmlFor="remember" className="font-medium text-gray-900">Acepto los <a href="#" className="text-teal-500 hover:underline">Términos y Condiciones</a> del servicio</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">Create account</button>
                        <div className="text-sm font-medium text-gray-500">
                            ¿Ya tienes una cuenta? <Link href="/login" className="text-teal-500 hover:underline">Ingresá</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}