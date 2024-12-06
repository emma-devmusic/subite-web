import React from 'react'


interface Props {
    text: string;
    classes?: string;
    variant: 'outline-primary' | 'primary';
    action?: (e?:any) => void;
}

export const Button = ({ text, classes, variant, action }: Props) => {

    const variants = {
        ['outline-primary']: 'border-primary text-primary  hover:border-primary hover:bg-primary hover:text-white',
        primary: 'border-primary bg-primary text-white  hover:border-primary hover:bg-primaryHover hover:text-white'
    }
    const buttonVariant = variants[variant]

    return (
        <button
            className={`py-2 px-10 border-[1px] rounded transition-all ${buttonVariant} ${classes}`}
            onClick={action}
        >
            {text}
        </button>
    )
}
