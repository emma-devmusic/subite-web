import React from 'react'


interface Props {
    text: string;
    classColor: string;
}

export const Tag = ({text, classColor}: Props) => {

    return (
        <span className={`inline-block ms-1 text-xs text-white py-1 px-2 rounded-lg ${classColor}`}>
            {text}
        </span>
    )
}
