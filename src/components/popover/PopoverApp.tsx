'use client'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'


interface Props {
    children: React.ReactNode;
    button: JSX.Element;
    classOpen: string;
    classClose: string;
    position?: 'start' | 'center' | 'end';
}


export const PopoverApp = ({ children, button, classOpen, classClose, position = 'end' }: Props) => {

    return (
        <Popover className={`flex flex-col justify-center items-${position} items-end`} >
            {
                ({ open }) => (
                    <>
                        <Popover.Button className={open ? classOpen : classClose}>
                            {button}
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-2"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-1"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Popover.Panel
                                className={`absolute top-full z-20 bg-white p-1 min-w-36 rounded-md shadow-md text-gray-700`}
                            >
                                {children}
                            </Popover.Panel>
                        </Transition>
                    </>
                )
            }
        </Popover>
    )
}

