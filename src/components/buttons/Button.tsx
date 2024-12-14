import React, { ReactNode } from 'react'


interface Props {
    text: string;
    classes?: string;
    variant: 'outline-primary' | 'primary' | 'plain';
    action?: (e?:any) => void;
    icon?: ReactNode;
}

export const Button = ({ text, classes, variant, action, icon }: Props) => {

    const variants = {
        ['outline-primary']: 'border-primary text-primary  hover:border-primary hover:bg-primary hover:text-white ',
        primary: 'border-primary bg-primary text-white  hover:border-primary hover:bg-primaryHover hover:text-white',
        plain: 'border-none bg-white shadow text-secondary hover:bg-gray-50'
    }
    const buttonVariant = variants[variant]

    return (
        <button
            className={`py-2 px-4 border-[1px] flex items-center gap-2 rounded transition-all ${buttonVariant} ${classes}`}
            onClick={action}
        >
            {icon}
            {text}
        </button>
    )
}
