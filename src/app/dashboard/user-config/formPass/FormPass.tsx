import { useForm } from "@/hooks/useForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export const FormPass = () => {
    const [passVisible, setPassVisible] = useState(false);


    const [values, handleInputChange, reset] = useForm({
        old_password: '',
        new_password: '',
        new_password_2: ''
    })

    const changePassword = () => {
        console.log(values)
    }

    return (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h3 className="text-2xl font-semibold">Cambio de Contraseña</h3>
                <Icon
                    icon={passVisible ? 'streamline:visible-solid' : 'streamline:invisible-2-solid'}
                    className={`h-7 w-7 text-gray-600 hover:cursor-pointer ${passVisible && 'text-green-600'} `}
                    onClick={() => setPassVisible(!passVisible)}
                />
            </div>
            <hr className="" />
            <div className="flex gap-4 flex-col sm:flex-row">
                <div className=" sm:basis-1/2 xl:basis-1/3 flex flex-col gap-6 ">
                    <div>
                        <label htmlFor="passwordOld" className="text-sm font-medium text-gray-900 block mb-2">Contraseña Actual</label>
                        <div className="flex items-center">
                            <input
                                value={values.old_password}
                                onChange={handleInputChange}
                                type={passVisible ? 'text' : "password"}
                                name="passwordOld"
                                id="passwordOld"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="*********"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="passwordNew" className="text-sm font-medium text-gray-900 block mb-2">Nueva Contraseña</label>
                        <div className="flex items-center">
                            <input
                                value={values.new_password}
                                onChange={handleInputChange}
                                type={passVisible ? 'text' : "password"}
                                name="passwordNew"
                                id="passwordNew"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="*********"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="passwordNew2" className="text-sm font-medium text-gray-900 block mb-2">Introduce Nuevamente tu Contraseña</label>
                        <div className="flex items-center">
                            <input
                                value={values.new_password_2}
                                onChange={handleInputChange}
                                type={passVisible ? 'text' : "password"}
                                name="passwordNew2"
                                id="passwordNew2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="*********"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:basis-1/2 ">
                    <strong>Características de la Contraseña:</strong>
                    <span className="text-sm text-gray-500">Asegurate de los siguientes puntos:</span>
                    <span className="text-sm text-gray-500">*Item 1</span>
                    <span className="text-sm text-gray-500">*Item 1</span>
                    <span className="text-sm text-gray-500">*Item 1</span>
                </div>
            </div>
            <button
                className="bg-cyan-600 text-white rounded-md px-4 py-2 mt-1 hover:bg-cyan-500 transition-all sm:w-28"
                onClick={changePassword}
            >
                Cambiar
            </button>
        </div>
    );
};
