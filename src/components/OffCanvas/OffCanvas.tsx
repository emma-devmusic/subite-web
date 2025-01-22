import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    title: string;
    icon?: ReactNode;
    canvasId: string;
}

export const OffCanvas = ({ children, title, icon, canvasId }: Props) => {

    return (
        <div
            id={canvasId}
            className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-e "
            role="dialog"
            tabIndex={-1}
            aria-labelledby="hs-offcanvas-example-label"
        >
            <div className="flex justify-between items-center py-3 px-4 border-b z-[100]">
                <div
                    id="hs-offcanvas-example-label"
                    className="font-bold text-gray-800 flex items-center gap-2"
                >
                    {icon}
                    {title}
                </div>
                <button
                    type="button"
                    className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none "
                    aria-label="Close"
                    data-hs-overlay={`#${canvasId}`}
                    id={`close-offcanvas-${canvasId}`}
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
            <div className="p-4 flex flex-col gap-4 ">
                {children}
            </div>
        </div>
    )
}
