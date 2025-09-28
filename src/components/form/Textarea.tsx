import React, { useId } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    errorMsg?: string;
}

export const Textarea = ({
    id,
    label,
    name,
    className = '',
    errorMsg,
    required,
    ...rest
}: TextareaProps) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label 
                htmlFor={textareaId} 
                className={`block text-sm font-medium mb-2 ${errorMsg ? 'text-red-700' : 'text-gray-700'}`}
            >
                {label} {required && '*'}
            </label>
            <textarea
                id={textareaId}
                name={name}
                required={required}
                className={`
                    w-full px-4 py-3 border rounded-lg transition-colors resize-vertical
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${errorMsg 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }
                    disabled:bg-gray-50 disabled:text-gray-500
                `}
                {...rest}
            />
            {errorMsg && (
                <p className="mt-1 text-sm text-red-600">
                    {errorMsg}
                </p>
            )}
        </div>
    );
};