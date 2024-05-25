import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";

interface Props {
    msg: null | string | ReactElement;
    typeMsg?: null | 'error' | 'info' | 'success' | 'warning' | 'spinner' | undefined;
}

export const Message = ({msg}: Props) => {
    return (
        <div className="p-4 px-6">
            <div className="text-lg text-center">{ msg }</div>
        </div>
    )
}
