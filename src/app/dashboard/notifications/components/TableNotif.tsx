
import { TableLayout } from "@/components/tables/TableLayout";
import { ObjectNotification } from "@/types";
import { TableRowNotif } from "./TableRowNotif";

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
                notifications.length !== 0 
                ?
                    <TableLayout withCheckbox={false} columns={columns} >
                        {
                            notifications.map((notif, i) =>
                                <TableRowNotif {...notif} key={i} />
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
