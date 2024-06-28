'use client'
import { SmallSpinner } from "@/components/spinner/Spinner"
import { useAppSelector } from "@/store"


export const WelcomeMessage = () => {

    const {user} = useAppSelector( state => state.auth)

    if (!user) return <SmallSpinner />

    return (
        <div className="hidden lg:flex items-center">
            <span className="text-base font-medium text-gray-600 mr-5 text-nowrap">¡Hola, {user?.basic_data.name}!</span>
        </div>
    )
}

