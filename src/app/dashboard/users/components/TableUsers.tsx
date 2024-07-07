
import { useAppSelector } from "@/store";
import { THead } from "./THead";
import { TRow } from "./TRow";
import { Spinner } from "@/components/spinner/Spinner";






export const TableUsers = () => {

    const { loading } = useAppSelector(state => state.ui)
    const { users } = useAppSelector(state => state.manageUser)

    if (loading) return <div className=" h-full w-full"><Spinner /></div>

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <THead />
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        users.map( (user, i) => 
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
