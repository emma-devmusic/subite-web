'use client'


import { useAppSelector } from "@/store";
import { AccountVerified } from "./AccountVerified";
import { AccountInProcess } from "./AccountInProcess";
import { AccountRejected } from "./AccountRejected";
import { VerifyProcess } from "./VerifyProcess";
import "./styles.css"


export const VerifyAccount = () => {

    const { userProfile } = useAppSelector(state => state.auth)

    return (
        <div className="p-7">

            {
                (userProfile?.auth_user_audits_status_description === 'aprobado')
                    ?
                    <AccountVerified />
                    :
                    (userProfile?.auth_user_audits_status_description === 'cancelado' || userProfile?.auth_user_audits_status_description === 'pendiente')
                        ?
                        <VerifyProcess />
                        :
                        (userProfile?.auth_user_audits_status_description === 'en proceso')
                            ?
                            <AccountInProcess />
                            :
                            <AccountRejected />
            }

        </div>
    );
};
