# Ejemplo de Integración - Páginas Legales

## 🔗 URLs Generadas

Las siguientes rutas han sido creadas y están listas para usar:

- `https://tudominio.com/terms-and-conditions`
- `https://tudominio.com/privacy-policy`

## 📋 Ejemplo de Integración en Footer

```tsx
// components/layout/Footer.tsx
import { FooterLegalLinks } from '@/components/legal';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-4">Subite</h3>
            <p className="text-sm text-gray-600">
              Tu plataforma de subastas e intercambios de confianza.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/auctions" className="text-gray-600 hover:text-gray-900">Subastas</a></li>
              <li><a href="/categories" className="text-gray-600 hover:text-gray-900">Categorías</a></li>
              <li><a href="/about-us" className="text-gray-600 hover:text-gray-900">Sobre Nosotros</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/como-ofertar" className="text-gray-600 hover:text-gray-900">Cómo Ofertar</a></li>
              <li><a href="/como-subastar" className="text-gray-600 hover:text-gray-900">Cómo Subastar</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <LegalLinks layout="vertical" showIcons={false} />
          </div>
        </div>
        
        {/* Footer legal con copyright */}
        <FooterLegalLinks />
        
      </div>
    </footer>
  );
};
```

## 📝 Ejemplo de Integración en Formulario de Registro

```tsx
// components/auth/RegisterForm.tsx
import { LegalLinks } from '@/components/legal';

export const RegisterForm = () => {
  return (
    <form className="space-y-6">
      
      {/* Campos del formulario */}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="..." />
      </div>
      
      <div>
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" className="..." />
      </div>
      
      {/* Checkbox de aceptación */}
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          id="accept-terms" 
          className="mt-1"
          required 
        />
        <label htmlFor="accept-terms" className="text-sm text-gray-600">
          Acepto los{' '}
          <a href="/terms-and-conditions" className="text-blue-600 hover:text-blue-800 underline">
            Términos y Condiciones
          </a>
          {' '}y la{' '}
          <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
            Política de Privacidad
          </a>
        </label>
      </div>
      
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
        Registrarse
      </button>
      
    </form>
  );
};
```

## 🧭 Ejemplo de Navegación en Header

```tsx
// components/layout/Header.tsx
import { LegalLinks } from '@/components/legal';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between py-4">
          <div className="logo">
            <a href="/">Subite</a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="/auctions">Subastas</a>
            <a href="/categories">Categorías</a>
            <a href="/about-us">Sobre Nosotros</a>
            
            {/* Dropdown para páginas legales */}
            <div className="relative group">
              <button className="flex items-center gap-1">
                Legal <span>▼</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <LegalLinks layout="vertical" className="space-y-1" />
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile menu content with legal links */}
          {isMenuOpen && (
            <div className="py-4 border-t">
              <LegalLinks layout="vertical" className="space-y-2" />
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
};
```

## 📱 Ejemplo de Modal de Políticas

```tsx
// components/modals/LegalModal.tsx
import { useState } from 'react';
import { LegalLinks } from '@/components/legal';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {type === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <iframe 
            src={type === 'terms' ? '/terms-and-conditions' : '/privacy-policy'}
            className="w-full h-96 border-0"
            title={type === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad'}
          />
        </div>
        
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <LegalLinks />
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
        
      </div>
    </div>
  );
};
```

## 🔍 SEO y Meta Tags

Para mejorar el SEO, asegurate de agregar meta tags en cada página:

```tsx
// En cada página (page.tsx)
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Subite',
  description: 'Conoce los términos y condiciones de uso de Subite, tu plataforma de subastas e intercambios de confianza.',
  keywords: 'términos, condiciones, subite, subastas, intercambios, legal',
  robots: 'index, follow'
};
```

---

**Implementación completa lista para uso en producción** ✅