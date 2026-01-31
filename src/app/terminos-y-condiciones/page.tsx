import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout, LegalSection, LegalList, HighlightBox } from '@/components/legal';
import { 
  DocumentIcon, 
  HandshakeIcon, 
  PackageIcon, 
  SearchIcon, 
  TruckIcon, 
  ReturnIcon, 
  ShieldIcon, 
  MoneyIcon, 
  EditIcon, 
  PhoneIcon, 
  LockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  HelpCircleIcon 
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Subite',
  description: 'Conoce los términos y condiciones de uso de Subite, tu plataforma de subastas e intercambios de confianza.',
  keywords: 'términos, condiciones, subite, subastas, intercambios, legal',
  robots: 'index, follow'
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Términos y Condiciones"
      lastUpdated="27 de septiembre de 2025"
    >
      <div className="space-y-8">
        
        <LegalSection title="1. Aceptación de los Términos" icon={<DocumentIcon className="text-primary" />}>
          <p>
            Al acceder y utilizar los servicios de <strong>Subite</strong>, aceptás estos 
            términos y condiciones. Si no estás de acuerdo con alguna parte, 
            por favor no utilices nuestros servicios.
          </p>
        </LegalSection>

        <LegalSection title="2. Servicio de Intermediación" icon={<HandshakeIcon className="text-primary" />}>
          <p>
            <strong>Subite</strong> actúa como intermediario entre vendedores y compradores, 
            facilitando subastas e intercambios de objetos. No somos propietarios de 
            los artículos publicados, salvo que se indique expresamente.
          </p>
        </LegalSection>

        <LegalSection title="3. Publicaciones y Productos" icon={<PackageIcon className="text-primary" />}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                <CheckCircleIcon className="text-green-600" size={20} />
                Productos Permitidos
              </h4>
              <LegalList 
                type="allowed"
                items={[
                  "Objetos en buen estado, usados o nuevos, de uso doméstico o decorativo",
                  "Artículos coleccionables",
                  "Herramientas y electrodomésticos",
                  "Indumentaria y accesorios",
                  "Muebles y decoración"
                ]}
              />
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                <XCircleIcon className="text-red-600" size={20} />
                Productos No Permitidos
              </h4>
              <LegalList 
                type="forbidden"
                items={[
                  "Productos ilegales, peligrosos, falsificados o robados",
                  "Medicamentos y alimentos perecederos",
                  "Armas, materiales inflamables o explosivos",
                  "Objetos que infrinjan derechos de autor o propiedad intelectual"
                ]}
              />
            </div>
          </div>
        </LegalSection>

        <LegalSection title="4. Evaluación de Productos" icon={<SearchIcon className="text-primary" />}>
          <HighlightBox type="info" title="Servicio de Evaluación">
            <p>
              <strong>Subite</strong> puede ofrecer un servicio de evaluación previa (opcional) 
              para verificar el estado del producto antes de publicarlo.
            </p>
          </HighlightBox>
          <p>
            En los casos que no se haga evaluación física, el vendedor es responsable 
            de garantizar la veracidad de la descripción y las fotos.
          </p>
        </LegalSection>

        <LegalSection title="5. Política de Envíos y Entregas" icon={<TruckIcon className="text-primary" />}>
          <p>
            Las entregas pueden ser coordinadas entre partes o gestionadas por 
            <strong> Subite</strong> (según disponibilidad y zona).
          </p>
          <HighlightBox type="warning">
            <p>
              En caso de gestionar nosotros la entrega, los costos y tiempos serán 
              informados previamente. No nos hacemos responsables por daños causados 
              durante el transporte si no fue gestionado por nuestro equipo.
            </p>
          </HighlightBox>
        </LegalSection>

        <LegalSection title="6. Política de Devoluciones y Reembolsos" icon={<ReturnIcon className="text-primary" />}>
          <p>
            Las ventas realizadas a través de <strong>Subite</strong> son finales, 
            salvo que se demuestre que el producto no coincide con la descripción.
          </p>
          <div className="space-y-4">
            <HighlightBox type="info" title="Condiciones para Devolución">
              <LegalList items={[
                "Se podrá solicitar una devolución dentro de las 48 hs posteriores a la recepción del producto",
                "Solo aplica cuando el producto no coincida con la descripción",
                "Si Subite intervino en el cobro, se evaluará la posibilidad de reembolso, descontando gastos administrativos y de envío"
              ]} />
            </HighlightBox>
            <p className="text-red-600 font-medium flex items-center gap-2">
              <XCircleIcon className="text-red-600" size={20} />
              No se aceptan devoluciones por cambio de opinión o mal uso del producto.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="7. Protección del Comprador" icon={<ShieldIcon className="text-primary" />}>
          <LegalList items={[
            "Aseguramos transparencia en cada publicación y ofrecemos asesoramiento antes de ofertar",
            "Si detectás irregularidades, podés contactarnos antes de confirmar una compra",
            "En operaciones gestionadas por Subite, podemos retener el pago hasta verificar la entrega correcta del producto"
          ]} />
        </LegalSection>

        <LegalSection title="8. Protección del Vendedor" icon={<ShieldIcon className="text-primary" />}>
          <LegalList items={[
            "Solo se entregará el producto una vez confirmada la recepción del pago (en los casos gestionados por Subite)",
            "El vendedor tiene derecho a conocer la identidad del comprador",
            "Nos reservamos el derecho de bloquear usuarios que realicen compras fraudulentas o incumplan acuerdos"
          ]} />
        </LegalSection>

        <LegalSection title="9. Costos y Comisiones" icon={<MoneyIcon className="text-primary" />}>
          <p>
            <strong>Subite</strong> puede aplicar una comisión por publicación, venta o servicio de entrega. 
            Los valores serán informados antes de confirmar cada operación.
          </p>
          <p>
            El pago al vendedor se realizará una vez completado el proceso de entrega 
            o recolección, según lo acordado.
          </p>
        </LegalSection>

        <LegalSection title="10. Cambios en los Términos" icon={<EditIcon className="text-primary" />}>
          <HighlightBox type="warning" title="Modificaciones">
            <p>
              Estos términos pueden modificarse en cualquier momento. 
              Notificaremos los cambios en nuestros canales oficiales.
            </p>
          </HighlightBox>
        </LegalSection>

        {/* Contact Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HelpCircleIcon className="text-blue-600" size={20} />
            ¿Tenés dudas sobre estos términos?
          </h3>
          <p className="text-gray-600 mb-4">
            Estamos aquí para ayudarte. Contactanos a través de nuestros canales oficiales.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PhoneIcon className="w-4 h-4" size={16} />
              Contactanos
            </a>
            <a 
              href="/politica-de-privacidad" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LockIcon className="w-4 h-4" size={16} />
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
}