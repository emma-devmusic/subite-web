import { Logo } from "@/components/logo"
import { LogoTwo } from "@/components/logo/LogoTwo"

export const Brand = () => {
    return (
        <div className="col-span-full lg:col-span-2">
            <div className="flex justify-center items-center h-full">
                <LogoTwo classLogo="w-full"/>
            </div>
        </div>
    )
}
