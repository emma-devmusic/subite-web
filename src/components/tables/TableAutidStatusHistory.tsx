import { flu } from "@/helpers";
import { AuditStatusHistory } from "@/types";
import { ProductsAudit } from "@/types/products";
import { useEffect, useState } from "react";

interface Props {
    auditHistory: {
        user?: AuditStatusHistory[];
        products?: ProductsAudit[];
    }
}

export const TableAutidStatusHistory = ({ auditHistory }: Props) => {



    return (
        <div className="flex flex-col" style={{maxHeight: 500}}>
            <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                        <table className="table-fixed min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Estado
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Fecha
                                    </th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Notas
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    
                                    auditHistory.products 
                                    && auditHistory.products.map( (e,i) => (<tr className="hover:bg-gray-100" key={i}>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">{flu(e.product_audit_status.description)}</td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">{new Date(e.product_audit_status.data_created).toLocaleDateString()}</td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                        {e.note}
                                    </td>
                                </tr>))
                                }
                                {
                                    auditHistory.user &&
                                    auditHistory.user.map((e , i: number) => {
                                        return <tr className="hover:bg-gray-100" key={i}>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">{flu(e.audit_status_description)}</td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">{new Date(e.data_created).toLocaleDateString()}</td>
                                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                {e.notes.map((note, i) => <p key={i}>{note?.description}</p>)}
                                            </td>
                                        </tr>
                                    }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
