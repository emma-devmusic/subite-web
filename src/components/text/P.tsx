import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    className?: string
}

export const P = ({children, className = ''}:Props) => {

  return (
    <p className={`text-base sm:text-xl text-gray-700 ${className}`}>
        {children}
    </p>
  )
}
