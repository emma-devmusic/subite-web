'use client'
import { userSara } from "@/mocks/mocks";
import { useAppDispatch } from "@/store";
import { login } from "@/store/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    
    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch( login( userSara ) );
        router.push('/dashboard')
    }

    return (
        <div className="mx-auto flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
   
            <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm flex  xl:p-0">
                <div>
                    
                </div>
                <div className="p-6 sm:p-8 lg:p-16 space-y-8 flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Ingrese a su plataforma
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
                        <div className=" flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" required/>
                            </div>
                            <div className="text-sm ml-3">
                                <label htmlFor="remember" className="font-medium text-gray-900">Recordarme</label>
                            </div>
                            <a href="#" className="text-sm text-teal-500 hover:underline ml-auto">¿Olvidó su contraseña?</a>
                        </div>
                        <div>
                            <button 
                                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                                onClick={handleLogin}
                            >
                                Ingresar
                            </button>
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            ¿No está registrado? <Link href="/register" className="text-teal-500 hover:underline">Crear cuenta</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}