import React, { ReactNode } from 'react'


interface Props {
    text: string;
    classes?: string;
    variant: 'outline-primary' | 'primary' | 'plain' | 'danger';
    action?: (e?:any) => void;
    icon?: ReactNode;
    type?: 'button' | 'submit';
    disabled?: boolean;
    tooltip?: string;
}

interface VariantsButton {
    [key: string]: string
}

export const Button = ({ text, classes, variant, action, icon, type = "button", disabled = false, tooltip }: Props) => {

    const variants:VariantsButton = {
        ['outline-primary']: 'border-primary text-primary  hover:border-primary hover:bg-primary hover:text-white ',
        primary: 'border-primary bg-primary text-white  hover:border-primary hover:bg-primaryHover hover:text-white',
        plain: 'border-none bg-white shadow text-secondary hover:bg-gray-50',
        danger: 'bg-red-700 hover:bg-red-800 text-white'
    }
    const buttonVariant = variants[variant]

    return (
        <div className={tooltip ? 'relative group' : ''}>
            <button
                type={type}
                className={`py-2 px-4 border-[1px] flex items-center gap-2 rounded-lg transition-all ${buttonVariant} ${classes} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={disabled ? undefined : action}
                disabled={disabled}
                title={tooltip}
            >
                {icon}
                {text}
            </button>
            {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    )
}
