export const menuAccountStyles = (userProfile: any) => {
    return (
        `rounded-full object-cover border-2
        ${userProfile && ((userProfile?.auth_user_audits_status_description === 'aprobado')
            ?
            'border-cyan-500'
            :
            userProfile && (userProfile?.auth_user_audits_status_description === 'rechazado')
                ?
                'border-red-500'
                :
                'border-yellow-500'
        )}`
    )
}