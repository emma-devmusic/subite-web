import React, { useId } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    errorMsg?: string;
}

export const Select = ({
    id,
    label,
    name,
    options,
    className = '',
    errorMsg,
    required,
    ...rest
}: SelectProps) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label 
                htmlFor={selectId} 
                className={`block text-sm font-medium mb-2 ${errorMsg ? 'text-red-700' : 'text-gray-700'}`}
            >
                {label} {required && '*'}
            </label>
            <select
                id={selectId}
                name={name}
                required={required}
                className={`
                    w-full px-4 py-3 border rounded-lg transition-colors bg-white
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${errorMsg 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300'
                    }
                    disabled:bg-gray-50 disabled:text-gray-500
                `}
                {...rest}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errorMsg && (
                <p className="mt-1 text-sm text-red-600">
                    {errorMsg}
                </p>
            )}
        </div>
    );
};