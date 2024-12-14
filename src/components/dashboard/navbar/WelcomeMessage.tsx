'use client'

import { useAppSelector } from "@/store"


export const WelcomeMessage = () => {

    const {user} = useAppSelector( state => state.auth)

    if (!user) return <p className="me-3">Cargando información...</p>

    return (
        <div className="hidden lg:flex items-center">
            <span className="text-base font-medium text-gray-600 text-nowrap">¡Hola, {user?.basic_data.name}!</span>
        </div>
    )
}

