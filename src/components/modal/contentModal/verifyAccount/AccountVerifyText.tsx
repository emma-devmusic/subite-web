import { Icon } from "@iconify/react/dist/iconify.js";

export const AccountVerifyText = () => {
    return (
        <div className="">
            <div className="flex gap-2 items-center">
                <p className="text-lg font-medium">🎉 ¡Bienvenido/a!</p>
            </div>
            <hr className="my-3" />
            <div className="p-2 overflow-auto" style={{maxHeight: '500px'}}>
                <p className="mb-3">Para completar tu registro y comenzar a utilizar todas las funciones de nuestra aplicación, necesitamos verificar tu cuenta. Este proceso es sencillo y rápido. Solo necesitas presentar en los siguientes pasos la documentación requerida.</p>
                <p className="mb-3">Por favor, asegúrate de que tanto los documentos como la selfie sean legibles y estén actualizados.</p>
                <p className="mb-3">Una vez que hayamos recibido y revisado tus documentos, te notificaremos sobre el estado de tu verificación.</p>
                <p className="mb-3">Si tienes alguna pregunta o necesitas asistencia durante este proceso, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                <p className="mb-3">Gracias por tu cooperación. Saludos cordiales.</p>
                <p className="mb-3 text-cyan-600"><i>SubastasApp</i></p>
            </div>
        </div>
    );
};
