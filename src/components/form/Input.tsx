import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    errorMsg?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export const Input = ({
    id,
    label,
    name,
    type = 'text',
    className = '',
    errorMsg,
    icon,
    iconPosition = 'left',
    required,
    ...rest
}: InputProps) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label 
                htmlFor={inputId} 
                className={`block text-sm font-medium mb-2 ${errorMsg ? 'text-red-700' : 'text-gray-700'}`}
            >
                {label} {required && '*'}
            </label>
            <div className="relative">
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    required={required}
                    className={`
                        w-full px-4 py-3 border rounded-lg transition-colors
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errorMsg 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300'
                        }
                        ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
                        disabled:bg-gray-50 disabled:text-gray-500
                    `}
                    {...rest}
                />
                {icon && (
                    <div className={`absolute top-3.5 ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>
                        {icon}
                    </div>
                )}
            </div>
            {errorMsg && (
                <p className="mt-1 text-sm text-red-600">
                    {errorMsg}
                </p>
            )}
        </div>
    );
};