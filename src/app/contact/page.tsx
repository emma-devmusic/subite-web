
'use client';

import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button } from '@/components/buttons/Button';
import { Input, Textarea, Select } from '@/components/form';
import { 
  PhoneIcon, 
  DocumentIcon, 
  HelpCircleIcon,
  CheckCircleIcon,
  ShieldIcon 
} from '@/components/icons/LegalIcons';
import { league_spartan } from '../fonts';

const ClientLayout = dynamic(() => import('@/components/ClientLayout'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Aquí iría la lógica de envío del formulario
        console.log('Formulario enviado:', data);
        
        // Mostrar mensaje de confirmación (podrías usar un toast aquí)
        alert('¡Gracias por tu consulta! Te responderemos pronto.');
        
        // Resetear formulario
        (e.target as HTMLFormElement).reset();
    };

    return (
        <>
            <Head>
                <title>Contacto | Subite</title>
                <meta name="description" content="Ponte en contacto con el equipo de Subite. Te ayudamos con tus consultas sobre subastas e intercambios." />
                <meta name="keywords" content="contacto, subite, subastas, soporte, ayuda, consultas" />
                <meta name="robots" content="index, follow" />
            </Head>
            <ClientLayout>
                <div className="min-h-screen py-12 container-auction">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className={`text-center mb-12 ${league_spartan.className}`}>
                        <h1 className="text-center mt-10 lg:mt-0 text-4xl lg:text-6xl text-primary mb-4">Contactanos</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            ¿Tenés alguna pregunta sobre nuestras subastas? ¿Necesitás ayuda con una compra o venta? 
                            Estamos aquí para ayudarte.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className={`text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3 ${league_spartan.className}`}>
                                    <PhoneIcon className="text-gray-500" size={28} />
                                    Información de Contacto
                                </h2>
                                
                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                                        <DocumentIcon className="text-gray-500 mt-1" size={20} />
                                        <div>
                                            <h3 className={`font-semibold text-gray-700 ${league_spartan.className}`}>Email</h3>
                                            <p className="text-gray-600">contacto@subite.com</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Respondemos en menos de 24 horas
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                                        <PhoneIcon className="text-gray-500 mt-1" size={20} />
                                        <div>
                                            <h3 className={`font-semibold text-gray-700 ${league_spartan.className}`}>Teléfono</h3>
                                            <p className="text-gray-600">+54 11 1234-5678</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Lunes a Viernes: 9:00 - 18:00 hs
                                            </p>
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                                        <PhoneIcon className="text-gray-500 mt-1" size={20} />
                                        <div>
                                            <h3 className={`font-semibold text-gray-700 ${league_spartan.className}`}>WhatsApp</h3>
                                            <p className="text-gray-600">+54 9 11 1234-5678</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Respuesta rápida durante horario comercial
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div>
                                <h2 className={`text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3 ${league_spartan.className}`}>
                                    <HelpCircleIcon className="text-gray-500" size={28} />
                                    Preguntas Frecuentes
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg shadow-sm">
                                        <h3 className={`font-semibold text-gray-700 mb-2 flex items-center gap-2 ${league_spartan.className}`}>
                                            <CheckCircleIcon className="text-green-500" size={16} />
                                            ¿Cómo funciona una subasta?
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Las subastas tienen un tiempo límite. Podés ofertar hasta que termine el tiempo.
                                        </p>
                                    </div>
                                    
                                    <div className="p-4 bg-white rounded-lg shadow-sm">
                                        <h3 className={`font-semibold text-gray-700 mb-2 flex items-center gap-2 ${league_spartan.className}`}>
                                            <CheckCircleIcon className="text-green-500" size={16} />
                                            ¿Es seguro comprar en Subite?
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Sí, verificamos todos los productos y ofrecemos garantía de satisfacción.
                                        </p>
                                    </div>
                                    
                                    <div className="p-4 bg-white rounded-lg shadow-sm">
                                        <h3 className={`font-semibold text-gray-700 mb-2 flex items-center gap-2 ${league_spartan.className}`}>
                                            <CheckCircleIcon className="text-green-500" size={16} />
                                            ¿Cómo publico un producto?
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Creá tu cuenta, subí fotos del producto y completá la descripción.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className={`text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3 ${league_spartan.className}`}>
                                    <DocumentIcon className="text-gray-500" size={28} />
                                    Envianos tu Consulta
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        label="Nombre completo"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Tu nombre completo"
                                    />

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                    />

                                    <Input
                                        label="Teléfono"
                                        name="phone"
                                        type="tel"
                                        placeholder="+54 11 1234-5678"
                                    />

                                    <Select
                                        label="Asunto"
                                        name="subject"
                                        required
                                        options={[
                                            { value: "", label: "Selecciona un tema" },
                                            { value: "general", label: "Consulta general" },
                                            { value: "auction", label: "Pregunta sobre subasta" },
                                            { value: "purchase", label: "Problema con compra" },
                                            { value: "sell", label: "Quiero vender" },
                                            { value: "technical", label: "Problema técnico" },
                                            { value: "other", label: "Otro" }
                                        ]}
                                    />

                                    <Textarea
                                        label="Mensaje"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Contanos en detalle tu consulta o problema..."
                                    />

                                    {/* Privacy Notice */}
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                        <ShieldIcon className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                        <div>
                                            <p className="text-sm text-blue-700">
                                                <strong>Tu privacidad es importante.</strong> La información que nos proporcionás 
                                                será utilizada únicamente para responder tu consulta. 
                                                <a href="/privacy-policy" className="underline hover:text-blue-800">
                                                    Ver Política de Privacidad
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        text="Enviar Consulta"
                                        variant="primary"
                                        type="submit"
                                        classes="w-full justify-center text-lg"
                                        icon={<DocumentIcon className="text-white" size={20} />}
                                        tooltip="Envía tu consulta y te responderemos pronto"
                                    />

                                    <p className="text-sm text-gray-500 text-center">
                                        * Campos obligatorios. Responderemos en menos de 24 horas.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Additional Help Section */}
                    <div className="mt-16 text-center">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className={`text-2xl font-bold text-gray-700 mb-4 ${league_spartan.className}`}>
                                ¿Necesitás ayuda inmediata?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                También podés encontrar respuestas en nuestras páginas de ayuda
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/terms-and-conditions"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <DocumentIcon className="text-gray-600" size={16} />
                                    Términos y Condiciones
                                </a>
                                <a
                                    href="/como-ofertar"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <HelpCircleIcon className="text-gray-600" size={16} />
                                    Cómo Ofertar
                                </a>
                                <a
                                    href="/como-subastar"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <HelpCircleIcon className="text-gray-600" size={16} />
                                    Cómo Subastar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
        </>
    );
}