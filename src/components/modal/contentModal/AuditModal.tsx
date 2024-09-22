import { flu } from "@/helpers";
import { useForm } from "@/hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { setStatusAccount } from "@/store/manageUserSlice";
import { setStatusProduct } from "@/store/productSlice";
import { DataUserStatus } from "@/types";

export const AuditModal = () => {

    const { userStatusArray, usersSelected } = useAppSelector(state => state.manageUser)
    const { productSelected, productAuditsStatuses } = useAppSelector(state => state.product)
    const { modal: { modalFor } } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    const [values, handleInputChange] = useForm({
        status: '',
        note: ''
    })

    const handleStatus = (e: any) => {
        e.preventDefault()
        if (modalFor === 'audit_user') {
            dispatch(setStatusAccount({ ...values, id: usersSelected?.user_id }))
        }

        if (modalFor === 'audit_product') {
            let payload = {
                product_id: productSelected.product_variations[0].id,
                audit_status_id: parseInt(values.status),
                status_note: values.note
            }
            dispatch(setStatusProduct(payload))
        }
    }

    return (
        <div className="flex flex-col gap-4 p-5 py-6">
            <div>
                <h4 className="text-xl text-center text-cyan-700">Decide sobre este {modalFor === 'audit_user' ? 'usuario' : 'producto'}.</h4>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleStatus}>
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
                            modalFor === 'audit_user'
                                ? userStatusArray?.length === 0
                                    ? <p>Cargando...</p>
                                    : userStatusArray?.map((e: DataUserStatus, i) =>
                                        <option value={`${e.id}`} key={i}>{flu(e.description)}</option>
                                    )
                                : productAuditsStatuses.length === 0
                                    ? <p>Cargando...</p>
                                    : productAuditsStatuses.map((e, i) =>
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
