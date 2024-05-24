'use client'
import { useAppSelector } from "@/store"


export const WelcomeMessage = () => {

    const {user} = useAppSelector( state => state.auth)


    return (
        <div className="hidden lg:flex items-center">
            <span className="text-base font-medium text-gray-600 mr-5">¡Bienvenida, {user?.basic_data.name}!</span>
        </div>
    )
}

