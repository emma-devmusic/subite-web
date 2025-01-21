

interface UserTableHead {
    allUsersChecked: boolean;
    handleAllUsersChecked: (e:any) => void;
}

export const THead = ({ allUsersChecked, handleAllUsersChecked }: UserTableHead) => {


    return (
        <thead className="bg-gray-100">
            <tr>
                <th scope="col" className="p-4 w-2">
                    <div className="flex items-center">
                        <input
                            checked={allUsersChecked}
                            onChange={handleAllUsersChecked}
                            id="checkbox-all"
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded hover:cursor-pointer"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Usuario
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Teléfono
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Cuenta
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Tipo de usuario
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                </th>
                <th scope="col" className="p-4 ">
                    Acciones
                </th>
            </tr>
        </thead>
    );
};
