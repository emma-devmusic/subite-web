'use client'
import { useAppForm } from "@/hooks/useAppForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { Footer } from "@/components/dashboard";
import Link from "next/link";
import styles from './login.module.css';
import imageLogin from '../../assets/img/login.png'
import Image from "next/image";

export default function LoginPage() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const { isLogged } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isLogged) router.push('/dashboard')
    }, [isLogged])

    const [values, handleInputChange, reset] = useAppForm({
        email: 'lelac30182@digdy.com',
        password: '123456Emma!'
    })

    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(loginData(values));
    }

    return (
        <div className={`flex flex-col justify-between overflow-auto`}>

            <div className={`min-w-[320px] mx-4 mt-6 bg-white sm:mx-6 shadow-lg rounded-lg md:my-10  min-h-[600px] md:min-h-full md:h-full md:w-full md:max-w-screen-lg md:mx-auto flex flex-col md:flex-row justify-between items-center xl:p-0 overflow-hidden`}>
                <div className="overflow-hidden h-full flex items-center md:basis-3/6">
                    <Image src={imageLogin} alt="Logo Subite Subastas" width={500} height={500} />
                </div>
                <div className="p-6 sm:p-8 lg:px-8 space-y-8 w-full  bg-white md:basis-3/6 rounded-b-lg md:rounded-e-lg md:rounded-none md:border-l-[1px] border-gray-300">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        ¡Bienvenido!
                    </h2>
                    <form className="mt-8 space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-600 block mb-2">Email</label>
                            <input
                                value={values.email}
                                onChange={handleInputChange}
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-600 block mb-2">Contraseña</label>
                            <input
                                value={values.password}
                                onChange={handleInputChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                            />
                        </div>
                        <div className="flex gap-1 items-center">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-primaryHover h-4 w-4 rounded mr-2" required />
                            <label htmlFor="remember" className="font-medium text-gray-900">Recordarme</label>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-primaryHover font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
                                onClick={handleLogin}
                            >
                                Ingresar
                            </button>
                            <div className="flex flex-col gap-2 mt-2 sm:flex-row sm:justify-between md:flex-col">
                                <div className="text-center text-sm">
                                    ¿No está registrado? <Link href="/register" className="text-primary hover:underline">Crear cuenta</Link>
                                </div>
                                <div className="text-sm font-medium text-gray-500 text-center">
                                    <Link href="#" className="text-sm text-primary hover:underline ">¿Olvidó su contraseña?</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}