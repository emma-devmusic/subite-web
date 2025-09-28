'use client'

interface Props {
    children: React.ReactNode;
    button: JSX.Element;
    classOpen?: string;
    classClose?: string;
    position?: 'start' | 'center' | 'end';
    popoverId?: string;
}


export const PopoverApp = ({ children, button, classOpen, classClose, position = 'end', popoverId }: Props) => {

    return (
        <div className="hs-tooltip [--trigger:focus] [--placement:bottom] group" >
            <button
                className={`hs-tooltip-toggle flex justify-center items-center text-sm font-semibold rounded-lg text-gray-800  hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50`}
                id={popoverId}
            >
                {button}
            </button>
            <div
                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible group-hover:opacity-100 group-hover:visible hidden opacity-0 transition-opacity absolute invisible z-40 p-2 bg-white border text-sm text-gray-600 rounded-lg shadow-md"
                role="tooltip"
                style={{
                    zIndex: 1000,
                }}
            >
                {children}
            </div>
        </div>
    )
}

