import { Icon } from "@iconify/react/dist/iconify.js";

export const AccountInProcess = () => {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <Icon icon={'bitcoin-icons:verify-outline'} className={`text-4xl text-gray-600`} />
                <p className="text-lg">Cuenta En Proceso de Verificación</p>
            </div>
            <hr className="my-3" />
            <div className="p-2 ">
                <p className="mb-3 text-lg font-medium">¡Gracias por registrarte!</p>
                <p className="mb-3">Tu cuenta está actualmente en proceso de verificación. Este proceso es esencial para garantizar la seguridad y confianza en nuestra comunidad.</p>
                <p className="mb-3">Estamos revisando la información proporcionada y te notificaremos tan pronto como se complete la verificación. Este procedimiento puede tomar hasta 24hs.</p>
                <p className="mb-3">Mientras tanto, si tienes alguna pregunta o necesitas asistencia, nuestro equipo de soporte está aquí para ayudarte.</p>
                <p className="mb-3">Agradecemos tu paciencia y comprensión. Saludos Cordiales.</p>
                <p className="mb-3 text-cyan-600"><i>Subastas App</i></p>
            </div>
        </div>
    );
};
