import React, { useId } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
    value,
    ...rest
}: SelectProps) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label
                htmlFor={selectId}
                className={`mb-1 block text-sm font-medium ${errorMsg ? 'text-red-700' : 'text-gray-700'}`}
            >
                {label} {required && '*'}
            </label>
            <div className="relative">
                <select
                    id={selectId}
                    name={name}
                    required={required}
                    value={value}
                    aria-invalid={!!errorMsg}
                    className={`
                        w-full appearance-none rounded-md border bg-white px-2.5 py-2.5 pr-10 text-sm transition-all
                        focus:outline-none focus:ring-2
                        ${value === '' || value === '0' || value === 0 ? 'text-gray-500' : 'text-gray-700'}
                        ${errorMsg
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }
                        disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400
                    `}
                    {...rest}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="text-gray-700"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                />
            </div>
            {errorMsg && (
                <p className="mt-1 text-sm text-red-600">
                    {errorMsg}
                </p>
            )}
        </div>
    );
};
