
import AnimatedDiv from '@/components/animated/AnimatedDiv'
import { SectionHeading } from '@/components/text/SectionHeading'
import { P } from '@/components/text/P'
import { Card } from '@/components/cards/Card'
import { Logo } from '@/components/logo'
import '../styles.css'

export const Subastar = () => {
    return (
        <div className='how-auction text-gray-700'>
            <SectionHeading heading='¿Cómo Subastar?' tag="h1" />
            <P className='mb-16'>
                Subastar en <strong><i>Subite Subastas</i></strong> es un proceso sencillo y seguro diseñado para garantizar la legalidad y transparencia en cada transacción.
                Sigue estos pasos para ofrecer tus productos y que puedan ser subastados por un martillero profesional:
            </P>
            <div className='flex flex-col gap-16'>
                <AnimatedDiv animationType='slideLeftFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className=''>
                            <svg className='text-cyan-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M20 15c-1 1 1.25 3.75 0 5s-4-1-5 0s-1.5 3-3 3s-2-2-3-3s-3.75 1.25-5 0s1-4 0-5s-3-1.5-3-3s2-2 3-3s-1.25-3.75 0-5s4 1 5 0s1.5-3 3-3s2 2 3 3s3.75-1.25 5 0s-1 4 0 5s3 1.5 3 3s-2 2-3 3ZM7 12l3 3l7-7" /></svg>
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>1.</span> Regístrate y Valida tu Identidad</h2>
                            <ul>
                                <li><strong>Registro:</strong> Haz clic en el botón “Registrarse” y completa el formulario con tus datos personales.</li>
                                <li><strong>Validación de Identidad:</strong> Proporciona los documentos oficiales solicitados para confirmar tu identidad. Este proceso garantiza que todos los participantes sean personas reales.</li>
                                <li><strong>Revisión y Aprobación:</strong> Una vez enviados tus datos, nuestro equipo revisará tu información. Recibirás un correo electrónico cuando tu cuenta haya sido aprobada.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <AnimatedDiv animationType='slideRightFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className=''>
                            <svg className='text-yellow-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="2 2 20 20"><path fill="currentColor" d="M5.6 2A2.6 2.6 0 0 0 3 4.6v4.8A2.6 2.6 0 0 0 5.6 12h2.8A2.6 2.6 0 0 0 11 9.4V4.6A2.6 2.6 0 0 0 8.4 2zm0 12A2.6 2.6 0 0 0 3 16.6v2.8A2.6 2.6 0 0 0 5.6 22h2.8a2.6 2.6 0 0 0 2.6-2.6v-2.8A2.6 2.6 0 0 0 8.4 14zm10-12A2.6 2.6 0 0 0 13 4.6v2.8a2.6 2.6 0 0 0 2.6 2.6h2.8A2.6 2.6 0 0 0 21 7.4V4.6A2.6 2.6 0 0 0 18.4 2zm0 10a2.6 2.6 0 0 0-2.6 2.6v4.8a2.6 2.6 0 0 0 2.6 2.6h2.8a2.6 2.6 0 0 0 2.6-2.6v-4.8a2.6 2.6 0 0 0-2.6-2.6z" /></svg>
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>2.</span> Accede a tu Panel de Usuario</h2>
                            <ul>
                                <li><strong>Inicio de Sesión:</strong> Ingresa con tu correo electrónico y contraseña en la sección de “Iniciar Sesión”.</li>
                                <li><strong>Panel de Usuario:</strong> Desde aquí, podrás cargar los detalles de los productos que quieras ofrecer para subasta.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <AnimatedDiv animationType='slideLeftFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className=''>
                            <svg className='text-blue-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="3 3 20 20"><path fill="currentColor" d="m17.616 19.87l-1.335-1.336q-.112-.111-.264-.12q-.151-.01-.282.12q-.131.132-.131.274t.13.273l1.7 1.7q.131.13.27.184q.14.052.298.052t.296-.052t.268-.184l1.7-1.7q.111-.112.12-.264q.01-.151-.12-.282q-.132-.131-.274-.131t-.28.137l-1.328 1.328v-3.33q0-.155-.115-.27T18 16.154t-.27.115q-.114.116-.114.27zm-5.62-7.54q.221 0 .425-.058q.204-.06.387-.158l5.69-3.291q.179-.098.23-.302q.05-.204-.05-.382t-.302-.228t-.378.053L12 11.427L6.002 7.964q-.177-.104-.378-.053t-.302.228t-.045.382t.23.302l5.685 3.29q.181.1.382.159t.422.059M4 15.61V8.39q0-.434.212-.803t.596-.595l6.384-3.678q.212-.125.4-.172T12 3.096t.42.046q.202.047.389.172l6.384 3.678q.384.226.596.595T20 8.39v3.361q0 .354-.279.565q-.279.212-.646.145q-.252-.068-.524-.082T18 12.366q-2.645 0-4.515 1.87t-1.87 4.514v.4q0 .185.031.341q.062.488-.314.77t-.78.066l-5.744-3.32q-.384-.225-.596-.594T4 15.61m14 7.14q-1.671 0-2.835-1.164Q14 20.42 14 18.75t1.165-2.835T18 14.75t2.836 1.165T22 18.75t-1.164 2.836T18 22.75" /></svg>
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>3.</span> Carga tus Productos</h2>
                            <p className='mb-4 bg-slate-100 p-2 rounded-md border-l-4 border-slate-500'>
                                <i>
                                    Este paso es fundamental para que el martillero pueda evaluar tu producto y decidir si se subastará:
                                </i>
                            </p>
                            <ul>
                                <li><strong>Selecciona “Cargar Producto”:</strong> En tu panel, encontrarás la opción para agregar un nuevo producto.</li>
                                <li><strong>Completa la Información del Artículo:</strong> Proporciona una descripción detallada, título, categoría y condiciones del producto.</li>
                                <li><strong>Fotografías de Calidad:</strong> Sube imágenes claras y bien iluminadas para mostrar tu producto de la mejor manera posible.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <AnimatedDiv animationType='slideRightFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className=''>
                            <svg className='text-green-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 24 24"><path fill="currentColor" d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414" /></svg>
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>4.</span> Evaluación por el Martillero</h2>
                            <ul>
                                <li><strong>Revisión Profesional:</strong> Un martillero profesional revisará la información y las fotos del producto para asegurarse de que cumple con los requisitos y estándares de la plataforma.</li>
                                <li><strong>Aprobación o Solicitud de Ajustes:</strong> El martillero podrá aprobar el producto para la subasta o solicitarte que realices correcciones o proporciones información adicional.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <AnimatedDiv animationType='slideLeftFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className=''>
                            <svg className='text-teal-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 20 20"><path fill="currentColor" d="M9.967 8.193L5 13h3v6h4v-6h3zM18 1H2C.9 1 0 1.9 0 3v12c0 1.1.9 2 2 2h4v-2H2V6h16v9h-4v2h4c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2M2.5 4.25a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5m2 0a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5M18 4H6V3h12.019z" /></svg>
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>5.</span> Publicación de la Subasta por el Martillero</h2>
                            <ul>
                                <li><strong>Creación de la Subasta:</strong> Una vez aprobado, el martillero registrará la subasta en el sistema, indicando la fecha de inicio, la duración, los incrementos de puja y demás detalles esenciales.</li>
                                <li><strong>Publicación:</strong> La subasta quedará programada en la plataforma para iniciar en la fecha y hora definidas por el martillero.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <AnimatedDiv animationType='slideRightFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className='w-[7rem] flex justify-center'>
                            <Logo onlyHammer hammerClass='h-[7rem]' />
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>6.</span> Desarrollo de la Subasta</h2>
                            <ul>
                                <li><strong>Monitoreo en Tiempo Real:</strong> Podrás seguir el estado de la puja y ver cómo evoluciona el precio de tu producto.</li>
                                <li><strong>Finalización de la Subasta:</strong> Al concluir, el sistema determinará automáticamente quién hizo la puja más alta.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <AnimatedDiv animationType='slideLeftFade'>
                    <Card className='flex flex-col sm:flex-row max-w-[380px] mx-auto sm:max-w-max p-6 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                        <div className=''>
                            <svg className='text-yellow-500' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M3.763.313a.75.75 0 0 1-.172 1.046A5.02 5.02 0 0 0 1.5 5.433a.75.75 0 1 1-1.5 0A6.52 6.52 0 0 1 2.716.14a.75.75 0 0 1 1.047.172Zm.055 2.255A4.5 4.5 0 0 1 11.5 5.75v3.5a1 1 0 0 0 1 1a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1a1 1 0 0 0 1-1v-3.5a4.5 4.5 0 0 1 1.318-3.182M5.25 13.25A.75.75 0 0 1 6 12.5h2A.75.75 0 0 1 8 14H6a.75.75 0 0 1-.75-.75M11.284.14a.75.75 0 1 0-.875 1.22A5.02 5.02 0 0 1 12.5 5.432a.75.75 0 1 0 1.5 0A6.52 6.52 0 0 0 11.284.14" clipRule="evenodd" /></svg>
                        </div>
                        <div>
                            <h2 className='items mb-8'><span className='text-primary'>7.</span> Notificación y Procesos Legales Finales</h2>
                            <ul>
                                <li><strong>Notificación al Ganador:</strong> El martillero o la plataforma notificará al comprador que ha ganado la puja.</li>
                                <li><strong>Coordinación de la Transacción:</strong> Se te contactará por llamada o correo electrónico para completar la venta y llevar a cabo los procedimientos legales y de pago correspondientes.</li>
                                <li><strong>Envío del Producto:</strong> Coordina con el comprador la forma de envío o entrega, siguiendo las políticas de la plataforma.</li>
                            </ul>
                        </div>
                    </Card>
                </AnimatedDiv>
                <hr />
                <div className='flex flex-col sm:flex-row p-4 sm:p-8 md:p-16 bg-opacity-30 items-center gap-8 md:gap-16'>
                    <div className=''>
                        <svg className='text-yellow-400' xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" viewBox="2 2 20 20"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9z" /></svg>
                    </div>
                    <div>
                        <h2 className='items mb-8'><span className='text-primary'>Consejos </span>para que tu producto se venda mejor</h2>
                        <ul>
                            <li><strong>Descripción Completa:</strong> Cuanta más información incluyas, más confianza generas en los posibles compradores.</li>
                            <li><strong>Imágenes de Alta Calidad:</strong> Muestra tu producto desde varios ángulos y con buena iluminación.</li>
                            <li><strong>Comunicación Activa:</strong> Responde con rapidez si el martillero o los interesados solicitan más detalles.</li>
                            <li><strong>Precio de Salida Atractivo:</strong> El martillero puede orientarte sobre un rango de precios adecuado.</li>
                        </ul>
                    </div>
                </div>
                <hr />
                {/* <p>
                    ¿Tienes más preguntas? Visita nuestra sección de
                    <a href="[LINK A PREGUNTAS FRECUENTES]">Preguntas Frecuentes</a>
                    o contáctanos en
                    <a href="[CORREO O ENLACE DE CONTACTO]">[Información de Contacto]</a>.
                </p> */}
            </div>
        </div >
    )
}
