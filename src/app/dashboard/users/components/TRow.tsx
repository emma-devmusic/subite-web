
import { Spinner } from "@/components/spinner/Spinner";
import { useAppSelector } from "@/store";
import { UserItem } from "@/types";
import Image from "next/image";

export const TRow = (user: UserItem) => {

    

    return (
        <tr className="hover:bg-gray-100">
            <td className="p-4 w-4">
                <div className="flex items-center">
                    <input id="checkbox-194556" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                    <label htmlFor="checkbox-194556" className="sr-only">checkbox</label>
                </div>
            </td>
            <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                <Image width={300} height={300} className="h-10 w-10 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                <div className="text-sm font-normal text-gray-500">
                    <div className="text-base font-semibold text-gray-900">{user.user_name} {user.user_last_name}</div>
                    <div className="text-sm font-normal text-gray-500">{user.user_email}</div>
                </div>
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{user.user_phone}</td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{user.current_audit_status}</td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{user.role_description}</td>
            <td className="p-4 whitespace-nowrap space-x-2 text-end">
                <button 
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                >
                    <svg className=" h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                </button>
                <button 
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </button>
            </td>
        </tr>
    );
};
