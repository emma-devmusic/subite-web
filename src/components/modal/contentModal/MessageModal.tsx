import React from 'react'
import { Message } from './Message'
import { useAppSelector } from '@/store'

export const MessageModal = () => {
    
    const { modal: { msg, typeMsg } } = useAppSelector( state => state.ui )

    return (
        <div className='h-[200px] flex justify-center items-center'>
            <Message msg={msg || ''} typeMsg={typeMsg} />
        </div>
    )
}
