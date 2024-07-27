'use client'
import { useState } from "react";

interface Props {
    withCheckbox: boolean;
    columns: string[];
}


export const TableHead = ({ withCheckbox, columns }: Props) => {

    const [checkState, setCheckState] = useState(false)
    
    return (
        <thead className="bg-gray-100">
            <tr>
                {
                    withCheckbox &&
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input
                                checked={checkState}
                                onChange={() => setCheckState(!checkState)}
                                id="checkbox-all"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                            />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                    </th>
                }
                {
                    columns.map((column, i) =>
                        <th scope="col" className={`p-4 ${(columns.length - 1 !== i) && 'text-left text-xs font-medium text-gray-500 uppercase'}`} key={i}>
                            {column}
                        </th>
                    )
                }
            </tr>
        </thead>
    );
};
