import { AuthRole, DataUserLoginResponse, DataUserProfile, UserPermission } from "@/types";

export class UserSession {

    private static instance: UserSession;
    private static dataUserLogin: DataUserLoginResponse;
    private static user: DataUserProfile;
    private static role: AuthRole;
    private static userPermission: UserPermission;

    private constructor() {}

    public static getInstance(): UserSession {
        if(!this.instance){
            this.instance = new UserSession();
        }
        return this.instance
    }



}