import { Spinner } from "@/components/spinner/Spinner";
import { useAppDispatch } from "@/store";
import { changeEmail, two_factor_change } from "@/store/authSlice";
import { DataUserProfile } from "@/types";
import { EventHandler, useEffect, useState } from "react";

interface Props { userProfile: DataUserProfile | null }

export const FormGeneral = ({ userProfile }: Props) => {


    const dispatch = useAppDispatch()

    const [emailChangeState, setEmailChangeState] = useState(true);
    const [emailInput, setEmailInput] = useState('')

    const [twoFactorChange, setTwoFactorChange] = useState(true);
    const [twoFactorSelect, setTwoFactorSelect] = useState(false)

    useEffect(() => {
        if (userProfile)
            setTwoFactorSelect(userProfile?.two_factor_enabled as boolean)
    }, [userProfile])


    const handleSubmitTwoFactor = () => {
        dispatch(
            two_factor_change({ two_factor_enabled: twoFactorSelect })
        )
    }
    
    const handleChangeEmail = () => {
        setEmailChangeState(!emailChangeState)
    }
    const handleSubmitEmail = (e: any) => {
        e.preventDefault()
        dispatch(changeEmail({ email: emailInput }))
    }


    return (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <h3 className="text-2xl font-semibold">Información General</h3>
            <hr className="mt-4" />
            <div className="flex flex-col mt-4 gap-4">

                <form onSubmit={handleSubmitEmail}>

                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                        <div className="w-full md:basis-1/2 xl:basis-1/3">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email: <i>{userProfile?.email}</i></label>
                            <input
                                disabled={emailChangeState}
                                value={emailInput}
                                onChange={(e: any) => setEmailInput(e.target.value)}
                                type="email"
                                name="email"
                                className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 disabled:bg-gray-50"
                                placeholder="Nuevo Email"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            disabled={!twoFactorChange}
                            className={` border-[1px] border-cyan-600 self-end rounded-md px-4 py-2  transition-all w-full sm:w-auto disabled:bg-slate-500 ${emailChangeState ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-white text-cyan-600 hover:bg-cyan-500 hover:text-white'}`}
                            onClick={handleChangeEmail}
                        >
                            {emailChangeState ? 'Cambiar' : 'Cancelar'}
                        </button>
                        <button
                            className={`bg-cyan-600 border-[1px] border-cyan-600  text-white self-end rounded-md px-4 py-2 hover:bg-cyan-500 transition-all w-full sm:w-auto ${(emailChangeState && 'hidden')}`}
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </form>




                <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                    <div className="md:basis-1/2 xl:basis-1/3 w-full">
                        {
                            userProfile?.two_factor_enabled
                                ? <i className="text-sm text-gray-500 ms-1">La autenticación en 2 factores ya está activada</i>
                                : <i className="text-sm text-red-400 ms-1">La autenticación en 2 factores está desactivada</i>
                        }
                        <div className={`flex items-center ${twoFactorChange && 'bg-gray-50'} border  border-gray-300 text-gray-900  rounded-lg focus:ring-cyan-600 focus:border-cyan-600 w-full p-2.5`}>
                            <input checked={twoFactorSelect} disabled={twoFactorChange} id="disabled-checked-checkbox" onChange={() => setTwoFactorSelect(!twoFactorSelect)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor={"disabled-checked-checkbox"} className={`ms-2 sm:text-sm w-full hover:cursor-pointer ${twoFactorChange && 'text-gray-500 hover:cursor-not-allowed'}`}>Autenticación en 2 factores</label>
                        </div>

                    </div>
                    <button
                        disabled={!emailChangeState}
                        className={` border-[1px] border-cyan-600 self-end rounded-md px-4 py-2 transition-all w-full sm:w-auto disabled:bg-slate-500 ${twoFactorChange ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-white text-cyan-600 hover:bg-cyan-500 hover:text-white'}`}
                        onClick={() => {
                            setTwoFactorChange(!twoFactorChange)
                            setTwoFactorSelect(userProfile?.two_factor_enabled as boolean)
                        }}
                    >
                        {twoFactorChange ? 'Cambiar' : 'Cancelar'}
                    </button>
                    <button
                        className={`bg-cyan-600 border-[1px] border-cyan-600 self-end text-white rounded-md px-4 py-2 hover:bg-cyan-500 transition-all w-full sm:w-auto ${(twoFactorChange || (twoFactorSelect === userProfile?.two_factor_enabled) ? 'hidden': '')}`}
                        onClick={handleSubmitTwoFactor}
                    >
                        Guardar
                    </button>
                </div>




                {/* <div className="mt-4 flex items-center">
                    <button
                        className="bg-cyan-600 self-end text-white rounded-md px-4 py-2 mt-1 hover:bg-cyan-500 transition-all"
                    >
                        Validar Email
                    </button>
                </div> */}
            </div>
        </div>
    );
};
