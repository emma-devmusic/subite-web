'use client'

import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ClientOnly = ({ children, fallback = null }: Props) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback
  }

  return <>{children}</>
}
