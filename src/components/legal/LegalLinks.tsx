import React from 'react';
import Link from 'next/link';

interface LegalLinksProps {
  layout?: 'horizontal' | 'vertical';
  className?: string;
  showIcons?: boolean;
}

export const LegalLinks: React.FC<LegalLinksProps> = ({ 
  layout = 'horizontal', 
  className = '',
  showIcons = true
}) => {
  const links = [
    {
      href: '/terms-and-conditions',
      label: 'Términos y Condiciones',
      icon: '📝'
    },
    {
      href: '/privacy-policy', 
      label: 'Política de Privacidad',
      icon: '🔒'
    }
  ];

  const containerClass = layout === 'horizontal' 
    ? 'flex flex-wrap gap-4 items-center'
    : 'flex flex-col gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          {showIcons && <span>{link.icon}</span>}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

// Componente específico para footer
export const FooterLegalLinks: React.FC = () => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © 2025 Subite. Todos los derechos reservados.
        </p>
        <LegalLinks />
      </div>
    </div>
  );
};