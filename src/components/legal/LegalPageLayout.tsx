import React from 'react';
import { Logo } from '../logo';
import { league_spartan } from '@/app/fonts';
import { LogoTwo } from '../logo/LogoTwo';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  children
}) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className='flex justify-center mb-6'>
            <Logo classLogo='!w-[150px] sm:!w-[200px] !h-auto' responsive={false} />
        </div>
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-8 mb-8">
            <div className='flex items-start gap-3 sm:gap-0'>
                <div className='min-w-fit sm:w-[60px] mt-1'>
                    <Logo onlyHammer/>
                </div>
                <div>
                    <h1 className={`text-3xl font-bold text-gray-700 mb-2 ${league_spartan.className}`}>
                        {title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-sm text-gray-600 font-sans">
                        Última actualización: {lastUpdated}
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 sm:p-8 max-w-none">
            {children}
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};