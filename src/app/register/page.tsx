'use client'

import Link from "next/link";
import styles from './register.module.css';
import { useAppForm } from "@/hooks/useAppForm";
import { useAppDispatch } from "@/store";
import { formValidate, userToRegister } from "@/helpers";
import { useEffect, useState } from 'react';
import { fetchData } from "@/services/fetchData";
import { GenderTypes } from "@/types/dataFetching";
import { Footer } from "@/components/dashboard";
import { registerUser } from "@/store/slices/authSlice";

export default function RegisterPage() {

    const dispatch = useAppDispatch()
    const [errors, setErrors] = useState({ notARealProperty: 'some_value' } as any);
    const [flag, setFlag] = useState<any>(null)
    const [genderTypes, setGenderTypes] = useState([] as GenderTypes[])
    const [values, handleInputChange, reset] = useAppForm({
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
        gender_type: undefined,
        two_factor_enabled: undefined
    })

    useEffect(() => {
        if (Object.entries(errors).length === 0) {
            if(values.cell_phone_secondary === "") values.cell_phone_secondary = '-'
            dispatch(
                registerUser(
                    userToRegister(values)
                ))
        }
    }, [flag])

    useEffect(() => {
        if (flag !== null) setErrors(formValidate(values))
    }, [values])


    useEffect(() => {
        fetchData('/manage-auth/gender-types', "GET", null)
            .then(resp => setGenderTypes(resp.data))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(formValidate(values))
        setFlag(!flag);
    }

    return (
        <div className={`mx-auto flex flex-col justify-center  px-5 pt-4 pb-4  overflow-auto ${styles.image} ${styles.registerPage}`}>
            <div className="py-6 px-8 w-full bg-white shadow-lg mx-auto rounded-lg sm:max-w-screen-lg">

                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Regístrate
                </h2>

                <hr className="mt-4" />

                <form className="mt-8" action="#" onSubmit={handleSubmit}>
                    <div className="columns-1 md:columns-2 gap-7">
                        <div className="">
                            <div className="">
                                <input value={values.name} onChange={handleInputChange} type="text" name="name" id="name" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.name && 'border-[1px] border-red-400'}`} placeholder="Nombre" required />
                                {
                                    errors.name && <span className="text-red-400 text-xs">{errors.name}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.last_name} onChange={handleInputChange} type="text" name="last_name" id="lastname" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.last_name && 'border-[1px] border-red-400'}`} placeholder="Apellido" required />
                                {
                                    errors.last_name && <span className="text-red-400 text-xs">{errors.last_name}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.email} onChange={handleInputChange} type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.email && 'border-[1px] border-red-400'}`} placeholder="Correo Electrónico" required />
                                {
                                    errors.email && <span className="text-red-400 text-xs">{errors.email}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.password} onChange={handleInputChange} type="password" name="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.password && 'border-[1px] border-red-400'}`} placeholder="Contraseña" required />
                                {
                                    errors.password && <span className="text-red-400 text-xs">{errors.password}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.password2} onChange={handleInputChange} type="password" name="password2" id="password2" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.password2 && 'border-[1px] border-red-400'}`} placeholder="Ingresa tu contraseña nuevamente" required />
                                {
                                    errors.password2 && <span className="text-red-400 text-xs">{errors.password2}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.dni} onChange={handleInputChange} type="text" name="dni" id="dni" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.dni && 'border-[1px] border-red-400'}`} placeholder="Documento de Identidad" required />
                                {
                                    errors.dni && <span className="text-red-400 text-xs">{errors.dni}</span>
                                }
                            </div>
                        </div>
                        <div>

                            <div className="mt-4">
                                <input value={values.cell_phone} onChange={handleInputChange} type="text" name="cell_phone" id="cell_phone" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.cell_phone && 'border-[1px] border-red-400'}`} placeholder="Teléfono #1" required />
                                {
                                    errors.cell_phone && <span className="text-red-400 text-xs">{errors.cell_phone}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.cell_phone_secondary} onChange={handleInputChange} type="text" name="cell_phone_secondary" id="cell_phone_secondary" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.cell_phone_secondary && 'border-[1px] border-red-400'}`} placeholder="Teléfono #2" />
                                {/* {
                                    errors.cell_phone_secondary && <span className="text-red-400 text-xs">{errors.cell_phone_secondary}</span>
                                } */}
                            </div>
                            <div className="mt-4">
                                <input value={values.address} onChange={handleInputChange} type="text" name="address" id="address" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.address && 'border-[1px] border-red-400'}`} placeholder="Dirección, Ciudad, País" required />
                                {
                                    errors.address && <span className="text-red-400 text-xs">{errors.address}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <input value={values.age} onChange={handleInputChange} type="number" name="age" id="age" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.age && 'border-[1px] border-red-400'}`} placeholder="Edad" required />
                                {
                                    errors.age && <span className="text-red-400 text-xs">{errors.age}</span>
                                }
                            </div>
                            <div className="mt-4">
                                <select onChange={handleInputChange} name="gender_type" id="gender_type" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.gender_type && 'border-[1px] border-red-400'}`}>
                                    <option>Selecciona Género</option>
                                    {
                                        (genderTypes.length > 0)
                                            ? genderTypes.map(
                                                gender => {
                                                    return <option key={gender.id} className="hover:bg-cy" value={gender.id}>{gender.description}</option>
                                                }
                                            )
                                            : <option value={'loading'}>loading...</option>
                                    }
                                </select>
                                {
                                    errors.gender_type && <span className="text-red-400 text-xs">{errors.gender_type}</span>
                                }
                            </div>
                            <div className="mt-4">
                                {/* <label htmlFor="two_factor_enabled" className="text-sm font-medium text-gray-900 block mb-2">Autenticación en 2 factores</label> */}
                                <select value={values.two_factor_enabled} onChange={handleInputChange} name="two_factor_enabled" id="two_factor_enabled" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 ${errors.two_factor_enabled && 'border-[1px] border-red-400'}`}>
                                    <option value={''}>Autenticación en dos factores</option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                {
                                    errors.two_factor_enabled && <span className="text-red-400 text-xs">{errors.two_factor_enabled}</span>
                                }
                            </div>
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
                            Crear Cuenta
                        </button>
                        <div className="text-sm font-medium text-gray-500">
                            ¿Ya tienes una cuenta? <Link href="/login" className="text-teal-500 hover:underline">Ingresá</Link>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}