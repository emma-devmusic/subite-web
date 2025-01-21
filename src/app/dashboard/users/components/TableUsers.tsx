
import { useAppDispatch, useAppSelector } from "@/store";
import { THead } from "./THead";
import { TRow } from "./TRow";
import { Spinner } from "@/components/spinner/Spinner";
import { useState } from "react";
import { selectUser, unselectUser } from "@/store/slices/authSlice";

export const TableUsers = () => {

    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.ui)
    const { users } = useAppSelector(state => state.manageUser)
    const [allUsersChecked, setAllUsersChecked] = useState(false)

    const handleAllUsersChecked = (e: any) => {
        setAllUsersChecked(e.target.checked)
        users.forEach(user => {
            dispatch(
                (e.target.checked)
                    ? selectUser(user.user_id)
                    : unselectUser(user.user_id)
            )
        })
    }

    if (loading) return <div className=" h-full w-full"><Spinner /></div>

    return (
        <>
            <div className="flex flex-col">

                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <THead allUsersChecked={allUsersChecked} handleAllUsersChecked={handleAllUsersChecked} />
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        users.map((user, i) =>
                                            <TRow key={i} {...user} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
