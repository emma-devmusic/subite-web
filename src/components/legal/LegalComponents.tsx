import { league_spartan } from '@/app/fonts';
import React from 'react';

interface LegalSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

export const LegalSection: React.FC<LegalSectionProps> = ({
  title,
  icon,
  children,
  id
}) => {
  return (
    <section className="mb-8 font-sans" id={id}>
      <h2 className={`text-xl font-semibold text-gray-700 mb-4 flex items-start gap-2 ${league_spartan.className}`}>
        {icon && <div className="text-2xl inline-block">{icon}</div>}
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-4 font-sans">
        {children}
      </div>
    </section>
  );
};

interface LegalListProps {
  items: string[];
  type?: 'allowed' | 'forbidden' | 'default';
}

export const LegalList: React.FC<LegalListProps> = ({ 
  items, 
  type = 'default' 
}) => {
  const getListStyle = () => {
    switch (type) {
      case 'allowed':
        return 'text-green-700';
      case 'forbidden':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'allowed':
        return '✅';
      case 'forbidden':
        return '❌';
      default:
        return '•';
    }
  };

  return (
    <ul className={`space-y-2 ${getListStyle()} font-sans`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 font-sans">
          <span className="mt-1 flex-shrink-0">{getIcon()}</span>
          <span className="font-sans">{item}</span>
        </li>
      ))}
    </ul>
  );
};

interface HighlightBoxProps {
  type: 'info' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  type,
  title,
  children
}) => {
  const getBoxStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBoxStyles()} font-sans`}>
      {title && (
        <h4 className="font-semibold mb-2 flex items-center gap-2 font-sans">
          <span>{getIcon()}</span>
          {title}
        </h4>
      )}
      <div className="font-sans">{children}</div>
    </div>
  );
};