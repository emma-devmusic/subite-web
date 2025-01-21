import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    tagClass: string;
}

export const Tag = ({children, tagClass}: Props) => {

    return (
        <span className={`inline-block ms-1 text-xs text-white py-1 px-2 rounded-lg ${tagClass}`}>
            {children}
        </span>
    )
}
