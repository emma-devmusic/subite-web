
import { TableLayout } from "@/components/tables/TableLayout";
import { ObjectNotification } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const columns = [
    'Tipo',
    'Titulo',
    'Fecha',
    'Acciones'
]


export const TableNotif = ({ notifications }: { notifications: ObjectNotification[] }) => {


    return (
        <>
            {
                notifications.length !== 0 ?
                    <TableLayout withCheckbox={false} columns={columns} >
                        {
                            notifications.map((notif, i) =>
                                <tr className="hover:bg-gray-100" key={i}>
                                    <td className="p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                        <Icon icon={notif.icon} className="text-gray-600 text-2xl" />
                                    </td>
                                    <td className="p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                        <div className="flex flex-col gap-2">
                                            <p>
                                                {notif.title}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {notif.details}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                        {notif.date}
                                    </td>
                                    <td className="p-4 whitespace-nowrap space-x-2 text-end">
                                        <div className="flex items-center gap-1 justify-center">

                                            <Link
                                                href={notif.link}
                                                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                                            >
                                                {/* <svg className=" h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg> */}
                                                Ver
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </TableLayout>
                    : 
                    <div className="mt-24">
                        <p className="text-center text-gray-400 text-sm">Aún no tienes notificaciones.</p>
                    </div>
            }
        </>
    );
};
