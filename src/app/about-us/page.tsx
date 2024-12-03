import { BannerPages } from "@/components/banners/BannerPages"
import { league_spartan } from "../layout";
import img from '../../assets/img/bg-login.jpg'
import Image from "next/image";


export default function AboutPage() {
    return (
        <>
        <BannerPages title={'Sobre Nosotros'} bg={'about-us'} />
            <main className="container-auction m-auto grid grid-cols-1 gap-y-20 mt-20">


                <section id="about-us-content">
                    <h2 className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}><span className={`text-primary`}>¿</span>Quiénes <strong className={`text-primary`}>Somos?</strong></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <p className="text-xl sm:text-end">
                            En <strong className="text-primary">Subite.com</strong>, conectamos compradores y vendedores a través de una plataforma de subastas en línea confiable. Nos destacamos por nuestra transparencia, seguridad y compromiso con nuestros usuarios.
                        </p>
                    <Image src={img} width={500} height={500} className="object-cover h-64" alt="Equipo de TuNombreDeSubasta trabajando juntos" />
                    </div>
                </section>




                <section id="our-mission">
                    <h2 className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}>Nuestra <strong className={`text-primary`}>Misión</strong></h2>
                    <p className="text-base sm:text-xl">
                        Facilitar el proceso de compra y venta mediante subastas en línea, brindando una experiencia accesible, transparente y segura para nuestros usuarios.
                    </p>
                </section>




                <section id="our-values">
                <h2 className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}>Nuestros <strong className={`text-primary`}>Valores</strong></h2>
                    <ul className="text-base sm:text-xl">
                        <li><strong className="text-primary">Transparencia:</strong> Ofrecemos un proceso de subasta claro y justo para todos los participantes.</li>
                        <li><strong className="text-primary">Seguridad:</strong> Protegemos tus datos y transacciones con tecnología de vanguardia.</li>
                        <li><strong className="text-primary">Innovación:</strong> Innovamos constantemente para mejorar la experiencia de usuario.</li>
                        <li><strong className="text-primary">Compromiso:</strong> Estamos siempre disponibles para ayudarte y resolver tus inquietudes.</li>
                    </ul>
                </section>




                <section id="team">
                <h2 className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}>Conocé a nuestro <strong className={`text-primary`}>equipo</strong></h2>
                    <p className="text-base sm:text-xl">
                        Nuestro equipo está formado por expertos en tecnología, marketing y atención al cliente, todos comprometidos con ofrecerte la mejor experiencia en subastas en línea.
                    </p>
                    <img src="/images/equipo.jpg" alt="Foto del equipo de TuNombreDeSubasta" />
                </section>




                <section id="sara-seccini">
                <h2 className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}>La garantía de <strong className={`text-primary`}>Sara</strong></h2>
                    <p className="text-base sm:text-xl">
                        Todos los productos subastados en nuestra plataforma pasan por las manos de <strong>Sara Seccini</strong>, martillera pública y dueña de <strong>TuNombreDeSubasta</strong>. Sara es la encargada de verificar la autenticidad de cada producto y la veracidad de los usuarios registrados, garantizando así una experiencia segura y confiable para todos.
                    </p>
                    <img src="/images/sara-seccini.jpg" alt="Sara Seccini, martillera pública y dueña de TuNombreDeSubasta" />
                </section>




                <section id="contact">
                <h2 className={`${league_spartan.className} text-secondary text-4xl mb-12 text-center sm:text-start sm:text-5xl md:text-6xl`}><strong className={`text-primary`}>Contáctanos</strong></h2>
                    <p className="text-base sm:text-xl">
                        ¿Tienes preguntas o necesitas ayuda? Visita nuestra <a href="/contacto">página de contacto</a> o escríbenos a <a href="mailto:info@tunombrede-subasta.com">info@tunombrede-subasta.com</a>.
                    </p>
                </section>
            </main>
        </>
    );
}