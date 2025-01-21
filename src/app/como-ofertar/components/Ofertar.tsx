import { P } from '@/components/text/P'
import { SectionHeading } from '@/components/text/SectionHeading'
import '../styles.css'
import AnimatedDiv from '@/components/animated/AnimatedDiv'


export const Ofertar = () => {
    return (
        <div className='how-auction text-gray-700'>
            <SectionHeading heading='¿Cómo Ofertar?' tag="h1" />
            <P className='mb-16'>
                Para realizar una oferta en nuestro sistema de subastas, primero debes contar con una cuenta
                verificada y acceso a la subasta en curso. A continuación, te explicamos paso a paso
                cómo hacerlo.
            </P>
            <hr />
            <AnimatedDiv animationType='slideRightFade'>
            <div className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-cyan-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 16 16"><path fill="currentColor" d="M11 7c0 1.66-1.34 3-3 3S5 8.66 5 7s1.34-3 3-3s3 1.34 3 3"/><path fill="currentColor" fillRule="evenodd" d="M16 8c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M4 13.75C4.16 13.484 5.71 11 7.99 11c2.27 0 3.83 2.49 3.99 2.75A6.98 6.98 0 0 0 14.99 8c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.38 1.19 4.49 3.01 5.75" clipRule="evenodd"/></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>1.</span> Inicia sesión o regístrate</h2>
                    <P>
                        Si ya tienes cuenta, ingresa tu correo electrónico y contraseña en la opción
                        “Iniciar Sesión”. Si aún no estás registrado, selecciona “Registrarse”, completa
                        el formulario con tus datos y espera la validación correspondiente. Este proceso
                        asegura que todas las personas que participan en nuestras subastas son usuarios
                        verificados.
                    </P>
                </div>
            </div>
            </AnimatedDiv>
            <hr />
            <AnimatedDiv animationType='slideLeftFade'>
            <div className='flex flex-col sm:flex-row-reverse text-end max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-slate-400' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="2 2 20 20"><g fill="none"><path fill="currentColor" fillOpacity={0.25} fillRule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14M10.087 7.38A5 5 0 0 1 12 7a.5.5 0 0 0 0-1a6 6 0 0 0-6 6a.5.5 0 0 0 1 0a5 5 0 0 1 3.087-4.62" clipRule="evenodd"></path><path stroke="currentColor" strokeLinecap="round" d="M20.5 20.5L17 17"></path><circle cx={11} cy={11} r={8.5} stroke="currentColor"></circle></g></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>2.</span> Explora las subastas disponibles</h2>
                    <P>
                        Una vez dentro de tu cuenta, dirígete a la sección de subastas. Allí encontrarás
                        la lista de todos los productos que actualmente se están subastando. Selecciona
                        el artículo que te interese para ver los detalles y conocer el estado de la puja
                        más alta.
                    </P>
                </div>
            </div>
            </AnimatedDiv>
            <hr />
            <AnimatedDiv animationType='slideRightFade'>
            <div className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-green-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="2 2 20 20"><path fill="currentColor" d="M20 2H4c-1.103 0-2 .894-2 1.992v12.016C2 17.106 2.897 18 4 18h3v4l6.351-4H20c1.103 0 2-.894 2-1.992V3.992A2 2 0 0 0 20 2m-6 11H7v-2h7zm3-4H7V7h10z"/></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>3.</span> Revisa los detalles de la subasta</h2>
                    <P>
                        Antes de ofertar, es importante que leas detenidamente la descripción del producto,
                        revises las fotos y verifiques la información sobre gastos de envío, métodos de pago
                        y cualquier condición especial que aplique. También fíjate en el monto de la puja
                        más alta y el incremento mínimo requerido para realizar una nueva oferta.
                    </P>
                </div>
            </div>
            </AnimatedDiv>
            <hr />
            <AnimatedDiv animationType='slideLeftFade'>
            <div className='flex flex-col sm:flex-row-reverse text-end max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-blue-500' xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" viewBox="2 2 21 21"><path fill="currentColor" d="M21 13c.6 0 1.1.2 1.4.6c.4.4.6.9.6 1.4l-8 3l-7-2V7h1.9l7.3 2.7c.5.2.8.6.8 1.1c0 .3-.1.6-.3.8s-.5.4-.9.4H14l-1.7-.7l-.3.9l2 .8zM2 7h4v11H2z"/></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>4.</span> Realiza tu oferta</h2>
                    <P>
                        En la página de la subasta, encontrarás el campo donde ingresar tu oferta.
                        Asegúrate de que el monto sea mayor que la puja actual y respete el incremento
                        mínimo. Luego, confirma tu oferta. Si todo es correcto, el sistema te mostrará
                        un mensaje de confirmación para que verifiques que el monto ingresado es el
                        que realmente deseas ofrecer.
                    </P>
                </div>
            </div>
            </AnimatedDiv>
            <hr />
            <AnimatedDiv animationType='slideRightFade'>
            <div className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-purple-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="1 1 22 22"><path fill="currentColor" fillRule="evenodd" d="M1 12c2.028-4.152 6.192-7 11-7s8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7m11 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"/></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>5.</span> Monitorea tu puja</h2>
                    <P>
                        Observa el desarrollo de la subasta hasta que termine. Si otro usuario supera
                        tu oferta y todavía queda tiempo, puedes volver a ofertar con un monto mayor
                        para mantenerte como el postor más alto. El sistema puede enviarte notificaciones
                        (según tu configuración) cuando tu puja sea superada.
                    </P>
                </div>
            </div>
            </AnimatedDiv>
            <hr />
            <AnimatedDiv animationType='slideLeftFade'>
            <div className='flex flex-col sm:flex-row-reverse text-end max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-green-500' xmlns="http://www.w3.org/2000/svg" width="7em" height="7em" viewBox="1 1 30 30"><path fill="currentColor" d="M16 1.466C7.973 1.466 1.466 7.973 1.466 16S7.973 30.534 16 30.534S30.534 24.027 30.534 16S24.027 1.466 16 1.466m1.255 22.414v2.047h-1.958v-2.024c-3.213-.44-4.62-3.08-4.62-3.08l2-1.673s1.277 2.223 3.587 2.223c1.276 0 2.244-.683 2.244-1.85c0-2.728-7.35-2.397-7.35-7.458c0-2.2 1.74-3.785 4.138-4.16V5.86h1.958v2.045c1.672.22 3.652 1.1 3.652 2.993v1.452H18.31v-.704c0-.726-.925-1.21-1.96-1.21c-1.32 0-2.287.66-2.287 1.584c0 2.794 7.35 2.112 7.35 7.415c0 2.18-1.628 4.07-4.158 4.445"/></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>6.</span> Finaliza la subasta y coordina la compra</h2>
                    <P>
                        Cuando la subasta concluya, si tu oferta es la más alta, te convertirás en el
                        ganador. El sistema o el martillero se comunicarán contigo para coordinar el
                        pago y los pasos legales necesarios. Dependiendo de las políticas vigentes,
                        es posible que debas firmar documentos o realizar un depósito bancario antes
                        de recibir el producto.
                    </P>
                </div>
            </div>
            </AnimatedDiv>
            {/* <hr />
            <div className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                <div className=''>
                    <svg className='text-cyan-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M20 15c-1 1 1.25 3.75 0 5s-4-1-5 0s-1.5 3-3 3s-2-2-3-3s-3.75 1.25-5 0s1-4 0-5s-3-1.5-3-3s2-2 3-3s-1.25-3.75 0-5s4 1 5 0s1.5-3 3-3s2 2 3 3s3.75-1.25 5 0s-1 4 0 5s3 1.5 3 3s-2 2-3 3ZM7 12l3 3l7-7" /></svg>
                </div>
                <div>
                    <h2 className='items mb-8'><span className='text-primary'>7.</span> ¿Tienes dudas?</h2>
                    <P>
                        Si en algún momento te surgen preguntas, te recomendamos consultar la sección
                        de <a href="[URL_PREGUNTAS_FRECUENTES]">Preguntas Frecuentes</a> o ponerte
                        en contacto con nuestro equipo de soporte a través de
                        <a href="mailto:[CORREO_DE_CONTACTO]">[CORREO_DE_CONTACTO]</a> o el
                        <a href="[URL_DE_CONTACTO]">formulario de contacto</a> en nuestro sitio.
                        Estamos aquí para ayudarte a vivir la mejor experiencia de subasta posible.
                    </P>
                </div>
            </div> */}
        </div >
    )
}
