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
                className={`mb-1 block text-sm font-medium ${errorMsg ? 'text-red-700' : 'text-gray-700'}`}
            >
                {label} {required && '*'}
            </label>
            <textarea
                id={textareaId}
                name={name}
                required={required}
                aria-invalid={!!errorMsg}
                className={`
                    w-full resize-y rounded-md border bg-white px-2.5 py-2.5 text-sm text-gray-700 transition-all
                    focus:outline-none focus:ring-2
                    ${errorMsg
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-200 focus:border-primary focus:ring-primary/20'
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
