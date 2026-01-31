import React from 'react';
import { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { LegalSection, LegalList, HighlightBox } from '@/components/legal/LegalComponents'
import { 
  DocumentIcon, 
  ShieldIcon, 
  EditIcon, 
  MoneyIcon, 
  PhoneIcon, 
  LockIcon, 
  CheckCircleIcon,
  HelpCircleIcon 
} from '@/components/icons/LegalIcons'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Subite',
  description: 'Conoce cómo Subite protege tu información personal y respeta tu privacidad en nuestra plataforma de subastas.',
  keywords: 'privacidad, datos, subite, subastas, protección, información personal',
  robots: 'index, follow'
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Política de Privacidad"
      lastUpdated="27 de septiembre de 2025"
    >
      <div className="space-y-8">
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-3 flex flex-col sm:flex-row sm:items-center gap-2">
            <ShieldIcon className="text-gray-500" size={24} />
            Tu privacidad es importante para nosotros
          </h2>
          <p className="text-blue-700">
            En <strong>Subite</strong>, nos comprometemos a proteger tu información personal 
            y a ser transparentes sobre cómo la recopilamos, utilizamos y protegemos.
          </p>
        </div>

        <LegalSection title="1. ¿Qué datos recopilamos?" icon={<DocumentIcon className="text-primary" />}>
          <p className="mb-4">
            Recopilamos únicamente la información necesaria para brindarte nuestros servicios 
            de subastas e intercambios de manera segura y eficiente.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <HighlightBox type="info" title="Datos de Contacto">
              <LegalList items={[
                "Nombre completo",
                "Número de teléfono",
                "Dirección de contacto",
                "Dirección de correo electrónico"
              ]} />
            </HighlightBox>
            
            <HighlightBox type="info" title="Datos de Actividad">
              <LegalList items={[
                "Información de los productos ofrecidos",
                "Historial de operaciones realizadas",
                "Imágenes o datos provistos para publicaciones",
                "Preferencias de comunicación"
              ]} />
            </HighlightBox>
          </div>
        </LegalSection>

        <LegalSection title="2. ¿Cómo utilizamos tus datos?" icon={<EditIcon className="text-primary" />}>
          <p className="mb-4">
            Utilizamos tu información personal exclusivamente para los siguientes propósitos:
          </p>
          
          <div className="space-y-4">
            <HighlightBox type="success" title="Propósitos Principales">
              <LegalList 
                type="allowed"
                items={[
                  "Gestionar publicaciones, ofertas, entregas y cobros",
                  "Asesorarte de manera personalizada sobre subastas",
                  "Verificar la identidad en transacciones",
                  "Facilitar la comunicación entre compradores y vendedores"
                ]}
              />
            </HighlightBox>
            
            <HighlightBox type="info" title="Comunicaciones Opcionales">
              <p>
                Para informarte sobre novedades, promociones o actualizaciones del servicio, 
                <strong> solo si lo solicitás expresamente</strong>. Podés darte de baja en cualquier momento.
              </p>
            </HighlightBox>

            <HighlightBox type="success" title="Compromiso Importante">
              <p>
                 No compartimos tus datos con terceros sin tu autorización.
              </p>
            </HighlightBox>
          </div>
        </LegalSection>

        <LegalSection title="3. Seguridad de la información" icon={<LockIcon className="text-primary" />}>
          <p className="mb-4">
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <HighlightBox type="success" title="Medidas de Protección">
              <LegalList items={[
                "Encriptación de datos sensibles",
                "Acceso restringido a información personal",
                "Servidores seguros y actualizados",
                "Monitoreo continuo de seguridad"
              ]} />
            </HighlightBox>
            
            <HighlightBox type="warning" title="Tu Responsabilidad">
              <p className="mb-3">
                Internet no es 100% seguro. Te pedimos que:
              </p>
              <LegalList items={[
                "Mantengas tus credenciales seguras",
                "Informes cualquier actividad sospechosa",
                "No compartas información personal en mensajes públicos"
              ]} />
            </HighlightBox>
          </div>
        </LegalSection>

        <LegalSection title="4. Derechos del usuario" icon={<ShieldIcon className="text-primary" />}>
          <p className="mb-4">
            Como usuario de <strong>Subite</strong>, tenés los siguientes derechos sobre tus datos personales:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <HighlightBox type="info" title="Tus Derechos">
              <LegalList items={[
                "Acceso: Conocer qué datos tenemos sobre vos",
                "Rectificación: Corregir datos incorrectos o incompletos", 
                "Eliminación: Solicitar la eliminación de tus datos",
                "Portabilidad: Obtener una copia de tus datos"
              ]} />
            </HighlightBox>
            
            <HighlightBox type="success" title="Cómo Ejercer tus Derechos">
              <p className="mb-3">
                Para ejercer cualquiera de estos derechos, simplemente:
              </p>
              <LegalList items={[
                "Escribinos a través de nuestros canales oficiales",
                "Incluí tu nombre completo y solicitud específica",
                "Te responderemos en un plazo máximo de 30 días"
              ]} />
            </HighlightBox>
          </div>
        </LegalSection>

        <LegalSection title="5. Retención de datos" icon={<DocumentIcon className="text-primary" />}>
          <HighlightBox type="info" title="¿Cuánto tiempo conservamos tus datos?">
            <LegalList items={[
              "Datos de cuenta: Mientras mantengas tu cuenta activa",
              "Historial de transacciones: 5 años por requisitos legales",
              "Datos de comunicación: 2 años para soporte y mejoras",
              "Datos de marketing: Hasta que solicites darte de baja"
            ]} />
          </HighlightBox>
        </LegalSection>

        <LegalSection title="6. Cookies y tecnologías similares" icon={<LockIcon className="text-primary" />}>
          <p className="mb-4">
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma.
          </p>
          
          <div className="space-y-4">
            <HighlightBox type="info" title="Tipos de Cookies que Utilizamos">
              <LegalList items={[
                "Cookies esenciales: Necesarias para el funcionamiento básico",
                "Cookies de preferencias: Recordar tus configuraciones",
                "Cookies de análisis: Entender cómo usás la plataforma",
                "Cookies de seguridad: Detectar actividad fraudulenta"
              ]} />
            </HighlightBox>
            
            <p className="text-sm text-gray-600">
              Podés gestionar las cookies desde la configuración de tu navegador. 
              Ten en cuenta que deshabilitarlas puede afectar algunas funcionalidades.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="7. Cambios en esta política" icon={<EditIcon className="text-primary" />}>
          <HighlightBox type="warning" title="Actualizaciones">
            <p className='mb-3'>
              Podemos actualizar esta política de privacidad ocasionalmente. 
              Te notificaremos sobre cambios importantes a través de:
            </p>
            <LegalList items={[
              "Email a tu dirección registrada",
              "Notificación en la plataforma",
              "Actualización de la fecha en esta página"
            ]} />
          </HighlightBox>
        </LegalSection>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-blue-900">
            💬 ¿Tenés preguntas sobre tu privacidad?
          </h3>
          <p className="text-blue-700 mb-4">
            Estamos comprometidos con la transparencia. Si tenés alguna duda sobre 
            cómo manejamos tu información, no dudes en contactarnos.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PhoneIcon className="text-gray-600" size={16} /> Contactar Soporte
            </a>
            <a 
              href="/terminos-y-condiciones" 
              className="inline-flex items-center px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <DocumentIcon className="text-gray-600" size={16} /> Términos y Condiciones
            </a>
          </div>
        </div>

        {/* Last Updated Notice */}
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Esta política de privacidad fue actualizada por última vez el 27 de septiembre de 2025.
          </p>
        </div>
      </div>
    </LegalPageLayout>
  );
}