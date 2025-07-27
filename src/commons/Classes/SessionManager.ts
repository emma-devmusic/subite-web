import { AuthRole, BasicData, DataUserLoginResponse, Permission, User, UserPermission, UserPermissionsDecrypted } from "@/types";
import { fetchData } from "../../services/fetchData";
import EncryptData from "../helpers/EncryptData";
import { ResponseApiDing } from "@/types/api";
import { objToArray } from "../helpers";

const objPermissions = (data: Permission[]) => {

    const objModules: any = {}
    data?.forEach(e => {
        if (!!objModules[e.auth_module_id]) {
            objModules[e.auth_module_id] = {
                module_description: e.module_description,
                module_endpoint: e.module_endpoint,
                permission: [
                    ...objModules[e.auth_module_id]['permission'],
                    {
                        action_method: e.action_method,
                        action_description: e.action_description
                    }
                ]
            };
        } else {
            objModules[e.auth_module_id] = {
                module_description: e.module_description,
                module_endpoint: e.module_endpoint,
                permission: [{
                    action_method: e.action_method,
                    action_description: e.action_description
                }]
            };
        }
    })
    return objModules
}

const objPermissionsId = (data: Permission[]) => {
    const objModules: any = {}
    data?.forEach(e => {
        objModules[e.module_endpoint] = e.auth_module_id
    })
    return objModules
}

class SessionManager {
    private static instance: SessionManager;
    private static encrypter = new EncryptData()
    private userSession: DataUserLoginResponse | null = null; // Aquí se almacena la sesión del usuario
    private token: string = '';
    private conn: string = '';
    private role: number = 0;
    private authData: User | null = null;
    private basicData: BasicData | null = null
    private permission: Permission[] = [];
    private two_factor: boolean = false

    private gettingSessionFromSessionStorage():void {
        const storedUser = sessionStorage.getItem("session");
        if (storedUser) {
            const {data, error} = SessionManager.encrypter.decrypt(storedUser)
            if (!error) {
                this.userSession = data as DataUserLoginResponse | null;
                this.token = this.userSession!.access.accessToken as string
                this.conn = this.userSession!.access.conn as string
                const permissions =  SessionManager.encrypter.decrypt(this.userSession!.permissions)?.data as unknown as User
                this.authData = permissions
                this.basicData = permissions.basic_data;
                this.role = permissions.role_id
                this.permission = permissions.permission
            }
        }
    }

    public static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            console.log('GetInstance Shooting');
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

    public async login(credentials: { email: string; password: string }) {
        try {
            const { data }:ResponseApiDing<DataUserLoginResponse> = await fetchData('/manage-auth/signin', 'POST', credentials)

            this.userSession = data
            this.token = data.access.accessToken
            this.two_factor = data.two_factor
            this.conn = SessionManager.encrypter.decrypt(data.access.conn)!.data as string
            const permissions =  SessionManager.encrypter.decrypt(this.userSession.permissions)?.data as User
            debugger
            if( permissions ){
                this.authData = permissions
                this.role = permissions.role_id
                this.permission = permissions.permission
            }
            const userEncryted = SessionManager.encrypter.encrypt(JSON.stringify(this.userSession))
            sessionStorage.setItem("session", userEncryted);

        } catch (error) {
            console.error(error, 'Nivel 1');
            throw error;
        }
    }

    public async logout() {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        try {
            await fetchData('/manage-auth/signout', 'GET', null, this.token)
            this.userSession = null;
            sessionStorage.removeItem("session");
            this.authData = null
            this.conn =''
            this.token = ''
            this.role = 0
            this.userSession = null
            this.permission = []
            return true;
        } catch (error) {
            sessionStorage.clear()
            console.error(error, 'SessionManager-Logout');
            return false;
        }
    }

    public getSessionData():DataUserLoginResponse | null {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.userSession;
    }

    public getToken(): string | null {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.token
    }

    public getConn(): string | null {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.conn
    }

    public isAuthenticated(): boolean {
        return this.getSessionData() !== null;
    }

    public getPermissions() {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }

        return this.permission
    }

    public getRole() {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.role;
    }

    public getAuthData(): User | null {
        debugger
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.authData;
    }

    public getBasicData(): BasicData | null {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.basicData;
    }

    public hasTwoFactorAuthenticate(): boolean {
        if (!this.userSession) {
            this.gettingSessionFromSessionStorage()
        }
        return this.two_factor
    }

    public getArrayPermissions() {
        return objToArray(
            objPermissions(this.permission)
        )
    }

    public getModuleById(id: number) {
        return objPermissions(this.permission)[id]
    }

    public getPermissionsId() {
        return objPermissionsId(this.permission)
    }

    public getUSID() {
        return this.conn
    }

}

export default SessionManager;
