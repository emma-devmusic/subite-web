import { Logo } from "@/components/logo"
import { LogoTwo } from "@/components/logo/LogoTwo"

export const Brand = () => {
    return (
        <div className="col-span-2 lg:col-span-1">
            <div className="flex justify-center items-center h-full">
                <LogoTwo classLogo="w-full"/>
            </div>
        </div>
    )
}
