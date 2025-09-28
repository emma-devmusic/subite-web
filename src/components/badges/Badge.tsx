import React from 'react';

export type BadgeVariant = 'pending' | 'running' | 'finish' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const badgeVariants = {
  pending: 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20',
  running: 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20', 
  finish: 'bg-slate-500 text-white border-slate-600 shadow-slate-500/20',
  default: 'bg-secondary text-white border-secondary shadow-secondary/20'
};

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children, 
  className = '' 
}) => {
  const variantClasses = badgeVariants[variant];
  
  return (
    <span 
      className={`
        inline-flex items-center gap-x-1.5 py-1.5 px-3 
        rounded-full text-xs font-medium border
        shadow-lg backdrop-blur-sm
        transition-all duration-200 ease-in-out
        hover:shadow-xl
        hover:cursor-default
        ${variantClasses}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
};