import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";

interface Props {
    msg: null | string | ReactElement;
    typeMsg: 'success' | 'info' | 'warning' | 'error' | null | undefined
}

export const Message = ({msg, typeMsg}: Props) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div>
                {
                    typeMsg === 'success' && <CheckCircleIcon className=" h-8 w-8 text-green-400" />
                } 
                {
                    typeMsg === 'info' && <InformationCircleIcon className=" h-8 w-8 text-blue-400" />
                } 
                {
                    typeMsg === 'warning' && <ExclamationTriangleIcon className=" h-8 w-8 text-yellow-400" />
                } 
                {
                    typeMsg === 'error' && <XCircleIcon className=" h-8 w-8 text-red-400" />
                } 
            </div>
            <div className="text-lg text-center">{ msg }</div>
        </div>
    )
}
