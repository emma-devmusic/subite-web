import React from 'react'

interface Props {
    text:string;
}

export const TinyHead = ({text}: Props) => {

    return (
        <div className='mb-2 text-center sm:text-start'>
            <div className='inline text-white bg-primaryLight px-2 rounded-full text-base'>{text}</div>
        </div>
    )
}
