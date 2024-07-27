import { Icon } from "@iconify/react/dist/iconify.js";

export const AccountRejected = () => {
    
    return (
        <div>
            <div className="flex gap-2 items-center">
                <Icon icon={'material-symbols-light:cancel-outline'} className={`text-3xl text-red-600`} />
                <p className="text-lg">Cuenta Rechazada</p>
            </div>
            <hr className="my-3" />
            <div className="p-2 ">
                <p className="mb-3 text-lg font-medium">¡Lo sentimos mucho!</p>
                <p className="mb-3">Lamentamos informarte que tu solicitud de verificación de cuenta no ha sido aprobada en esta ocasión.</p>
                <p className="mb-3">El proceso de verificación es riguroso y, por motivos de seguridad, requerimos que todos los datos proporcionados sean precisos y verificables. Te sugerimos revisar la información enviada y asegurarte de que todos los documentos estén actualizados y sean legibles.</p>
                <p className="mb-3">Si necesitas asistencia para comprender el motivo del rechazo o quieres intentar nuevamente, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte a resolver cualquier inconveniente.</p>
                <p className="mb-3">Gracias por tu comprensión. Saludos cordiales.</p>
                <p className="mb-3 text-cyan-600"><i>SubastasApp</i></p>

            </div>
        </div>
    );
};
