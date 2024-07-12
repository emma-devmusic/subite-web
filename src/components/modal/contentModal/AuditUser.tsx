import { flu } from "@/helpers";
import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { getStatus, setStatusAccount } from "@/store/manageUserSlice";
import { DataUserStatus } from "@/types";
import { useEffect } from "react";

export const AuditUser = () => {

    const { userStatusArray, usersSelected } = useAppSelector(state=> state.manageUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!userStatusArray) dispatch( getStatus() )
    }, [])

    // useEffect( () => {
    // }, [userStatusArray])

    const [values, handleInputChange] = useForm({
        status: '',
        note: ''
    })

    const handleStatusUserAccount = (e: any) => {
        e.preventDefault()
        dispatch(
            setStatusAccount({...values, id: usersSelected?.user_id})
        )
    }

    return (
        <div className="flex flex-col gap-4 p-5 py-6">
            <div>
                <h4 className="text-xl text-center text-cyan-700">Decide sobre este usuario y su documentación</h4>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleStatusUserAccount}>
                <div>
                    <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Cambiar estado de cuenta:</label>
                    <select
                        name="status"
                        className="w-full border-[1px] border-gray-300 rounded-md p-1.5"
                        required
                        value={values.status}
                        onChange={handleInputChange}
                    >
                        <option value="">*Seleccionar</option>
                        {
                            userStatusArray?.length === 0
                                ?
                                <p>Cargando...</p>
                                :
                                userStatusArray?.map((e: DataUserStatus, i) =>
                                    <option value={`${e.id}`} key={i}>{flu(e.description)}</option>
                                )
                        }
                    </select>
                </div>
                <div className='w-100 my-2'>
                    <label htmlFor="description" className='mb-1 block text-sm font-medium leading-6 text-gray-800'>Nota:</label>
                    <textarea
                        rows={4}
                        name='note'
                        className='w-full rounded-md border-2 border-gray-200 px-3 py-1'
                        required
                        value={values.note}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 border-[1px] border-green-600  text-white self-end rounded-md px-4 py-2 hover:bg-green-500  transition-all w-full"
                >
                    Establecer
                </button>
            </form>
        </div>
    );
};
