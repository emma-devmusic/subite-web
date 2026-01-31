import { useAppSelector } from "@/store";
import { ModalHeader } from "../ModalHeader";
interface Props {
    close: () => void;
}
export const AuditDocument = ({ close }: Props) => {

    const { userDocument } = useAppSelector(state => state.manageUser)

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div aria-hidden="true" className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity" >
            </div>
            <div className="fixed inset-0 w-screen h-screen z-10 overflow-y-auto ">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                        <div className="p-1">
                            <ModalHeader close={close} />
                            <img src={userDocument.signed_url ?? ''} alt="Documentación" className="w-full h-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
