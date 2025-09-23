import React, { ReactNode } from 'react'


interface Props {
    text: string;
    classes?: string;
    variant: 'outline-primary' | 'primary' | 'plain' | 'danger';
    action?: (e?:any) => void;
    icon?: ReactNode;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

interface VariantsButton {
    [key: string]: string
}

export const Button = ({ text, classes, variant, action, icon, type = "button", disabled = false }: Props) => {

    const variants:VariantsButton = {
        ['outline-primary']: 'border-primary text-primary  hover:border-primary hover:bg-primary hover:text-white ',
        primary: 'border-primary bg-primary text-white  hover:border-primary hover:bg-primaryHover hover:text-white',
        plain: 'border-none bg-white shadow text-secondary hover:bg-gray-50',
        danger: 'bg-red-700 hover:bg-red-800 text-white'
    }
    const buttonVariant = variants[variant]

    return (
        <button
            type={type}
            className={`py-2 px-4 border-[1px] flex items-center gap-2 rounded-lg transition-all ${buttonVariant} ${classes} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={disabled ? undefined : action}
            disabled={disabled}
        >
            {icon}
            {text}
        </button>
    )
}
