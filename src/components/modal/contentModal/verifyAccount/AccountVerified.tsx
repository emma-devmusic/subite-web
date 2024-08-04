import { Icon } from "@iconify/react/dist/iconify.js";
import Confetti from 'react-confetti';

export const AccountVerified = () => {



    return (
        <div>
            <Confetti
                width={500}
                height={800}
                confettiSource={{
                    w: 5,
                    h: 5,
                    x: 0,
                    y: 0
                }}
                recycle={false}
            />
            <div className="flex gap-2 items-center">
                <Icon icon={'bitcoin-icons:verify-outline'} className={`text-4xl text-cyan-600`} />
                <p className="text-lg">Cuenta Verificada</p>
            </div>
            <hr className="my-3" />
            <div className="p-2 ">
                <p className="mb-3 text-lg font-medium">¡Enhorabuena! 🎉</p>
                <p className="mb-3">Nos complace informarte que tu cuenta ha sido verificada con éxito. Ahora puedes disfrutar de todas las funcionalidades de nuestra aplicación, incluyendo la publicación de productos y la creación de subastas.</p>
                <p className="mb-3">Estamos emocionados de ver todo lo que tienes para ofrecer y estamos aquí para ayudarte en cada paso del camino. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                <p className="mb-3">¡Empieza a vender ahora!</p>
                <p className="mb-3 text-cyan-600"><i>SubastasApp</i></p>
            </div>
        </div>
    );
};
