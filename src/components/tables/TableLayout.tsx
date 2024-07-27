import { ReactNode } from "react";
import { TableHead } from "./TableHead";

interface Props {
    withCheckbox: boolean;
    columns: string[];
    children: ReactNode
}

export const TableLayout = ({ withCheckbox, columns, children }: Props) => {


    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                        <table className="table-fixed min-w-full divide-y divide-gray-200">
                            <TableHead withCheckbox={withCheckbox} columns={columns} />
                            <tbody className="bg-white divide-y divide-gray-200">
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
