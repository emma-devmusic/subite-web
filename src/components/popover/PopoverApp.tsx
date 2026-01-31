'use client'

import { useState, useRef, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    button: JSX.Element;
    classOpen?: string;
    classClose?: string;
    position?: 'start' | 'center' | 'end';
    popoverId?: string;
    forceClose?: boolean;
}


export const PopoverApp = ({ children, button, classOpen, classClose, position = 'end', popoverId, forceClose }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Cerrar popover cuando forceClose cambia a true
    useEffect(() => {
        if (forceClose) {
            setIsOpen(false);
        }
    }, [forceClose]);

    // Cerrar popover al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);

    // Cerrar popover al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={popoverRef}>
            <button
                className={`flex justify-center items-center text-sm font-semibold rounded-lg text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50`}
                id={popoverId}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                {button}
            </button>
            {isOpen && (
                <div
                    className={`absolute ${position === 'end' ? 'right-0' : position === 'start' ? 'left-0' : 'left-1/2 -translate-x-1/2'} top-full mt-2 p-2 bg-white border text-sm text-gray-600 rounded-lg shadow-md`}
                    role="tooltip"
                    style={{
                        zIndex: 9999999,
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

