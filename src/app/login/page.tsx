'use client'
import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginData } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner/Spinner";
import { useEffect } from "react";
import { Footer } from "@/components/dashboard";
import Link from "next/link";
import styles from './login.module.css';

export default function LoginPage() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    
    const { loading } = useAppSelector(state => state.ui)
    const { isLogged } = useAppSelector(state => state.auth)

    useEffect(() => {
        if(isLogged) router.push('/dashboard')
    }, [isLogged])

    const [ values, handleInputChange, reset ] = useForm({
        email: 'lelac30182@digdy.com',
        password: '123456Emma!'
    } )

    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch( loginData( values ) );
    }

    if(loading) return <div className={`mx-auto flex justify-center items-center px-5 pt-4 pb-4 overflow-auto ${styles.loginPage} `}> <Spinner /> </div>

    return (
        <div className={`mx-auto flex flex-col justify-between px-5 pt-4 pb-4 overflow-auto ${styles.loginPage} `}>
   
            <div className={`${styles.image} bg-white mx-auto shadow-2xl rounded-lg md:mt-12 w-full min-h-[600px] md:min-h-full md:h-full sm:max-w-screen-lg flex flex-col md:flex-row justify-between items-center xl:p-0 `}>
                <div className="basis-3/6"></div>
                <div className="p-6 sm:p-8 lg:px-8 space-y-8 w-full  bg-white md:basis-3/6 rounded-b-lg md:rounded-e-lg md:rounded-none">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        Ingrese a su plataforma
                    </h2>
                    <form className="mt-8 space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                            <input 
                                value={values.email}
                                onChange={handleInputChange}
                                type="email" 
                                name="email" 
                                id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" 
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Contraseña</label>
                            <input 
                                value={values.password}
                                onChange={handleInputChange}
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" 
                            />
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
            <Footer />
        </div>
    );
}