'use client'

import DecryptedSession from "@/helpers/permissions";


export default function UserConfigPage() {



    const session = new DecryptedSession();
    const userConfigId = session.getPermissionsId()['user-config']
    const permissionsUserConfig = session.getModuleById(userConfigId)

    return (
        <div>
            <h1>User Config Page</h1>
        </div>
    );
}