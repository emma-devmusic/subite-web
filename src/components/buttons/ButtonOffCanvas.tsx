import React, { ReactNode } from 'react'

interface Props {
    icon?: ReactNode;
    text?: string;
    textClass?: string;
    buttonClass?: string;
    canvasFor: string;
}

export const ButtonOffCanvas = ({ icon, text, textClass, buttonClass, canvasFor }: Props) => {

    const classButton = `${buttonClass} py-2 px-6 pl-5 inline-flex items-center text-sm rounded-md shadow bg-gray-300 text-secondary hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none`

    return (
        <button
            type="button"
            className={classButton}
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-offcanvas-example"
            data-hs-overlay={`#${canvasFor}`}
        >
            <div className="flex gap-2 items-center">
                {icon}
                {
                    text && (
                        <span className={`${textClass}`}>{text}</span>
                    )
                }
            </div>
        </button>
    )
}
