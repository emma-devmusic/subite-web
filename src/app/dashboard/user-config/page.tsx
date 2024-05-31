'use client'

import DecryptedSession from "@/helpers/Permissions";


export default function UserConfigPage() {



    const session = new DecryptedSession();
    const userConfigId = session.getPermissionsId()['user-config']
    const permissionsUserConfig = session.getModuleById(userConfigId)

    return (
        <div className="pt-6 px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    Card
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 col-span-2">
                    Card
                </div>
            </div>
        </div>
    );
}