import { league_spartan } from '@/app/layout'
import { IconAuction } from '@/assets/icons/IconAuction'
import React, { ReactNode } from 'react'
import { P } from '../text/P'

interface Props {
    icon: ReactNode;
    title: string;
    text: string;
    iconClass?: string;
    textStyle?: string;
    titleStyle?: string;
}

export const IconTitleText = ({icon = <IconAuction />, title, text, textStyle, titleStyle}:Props) => {
    return (
        <div className='flex flex-col items-center gap-2 max-w-[200px] text-center'>
            {icon}
            <h3 className={`${league_spartan.className} ${titleStyle} text-lg sm:text-3xl text-gray-700`}>{title}</h3>
            <P className={`${textStyle} text-xs sm:text-base`}>{text}</P>
        </div>
    )
}
