'use client'
import PrelineScript from '../prelineScript/PrelineScript';

interface Props {
    children: React.ReactNode;
    button: JSX.Element;
    classOpen?: string;
    classClose?: string;
    position?: 'start' | 'center' | 'end';
}


export const PopoverApp = ({ children, button, classOpen, classClose, position = 'end' }: Props) => {

    return (
        <>
            <div className="hs-tooltip [--trigger:focus] [--placement:bottom]">
                <button
                    type="button"
                    className={`hs-tooltip-toggle flex justify-center items-center text-sm font-semibold rounded-lg text-gray-800  hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50`}
                >
                    {button}
                    <div
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible hidden opacity-0 transition-opacity absolute invisible z-10 p-2 bg-white border text-sm text-gray-600 rounded-lg shadow-md"
                        role="tooltip"
                    >
                        {children}
                    </div>
                </button>
            </div>
            <PrelineScript />
        </>
    )
}

