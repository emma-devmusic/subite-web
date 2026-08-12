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
                className={`mb-1 block text-sm font-medium ${errorMsg ? 'text-red-700' : 'text-gray-700'}`}
            >
                {label} {required && '*'}
            </label>
            <div className="relative">
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    required={required}
                    aria-invalid={!!errorMsg}
                    className={`
                        w-full rounded-md border bg-white px-2.5 py-2.5 text-sm text-gray-700 transition-all
                        focus:outline-none focus:ring-2
                        ${errorMsg
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }
                        ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
                        disabled:bg-gray-50 disabled:text-gray-500
                    `}
                    {...rest}
                />
                {icon && (
                    <div className={`pointer-events-none absolute inset-y-0 flex items-center text-gray-400 ${iconPosition === 'left' ? 'left-3' : 'right-3'}`}>
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
