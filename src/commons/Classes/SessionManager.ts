import { AuthRole, BasicData, DataUserLoginResponse, Permission, User, UserPermission, UserPermissionsDecrypted } from "@/types";
import { fetchData } from "../../services/fetchData";
import EncryptData from "../helpers/EncryptData";
import { ResponseApiDing } from "@/types/api";
import { objToArray } from "../helpers";
import { CookieUtils } from "./CookiesUtils";
import CrossTabCookieManager from "./CrossTabCookieManager";

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

    private gettingSessionFromCookies(): void {
        const storedSessionData = CookieUtils.getSessionData();

        // Obtener datos desde cookies individuales (estrategia principal)
        const cookieToken = CookieUtils.getAccessToken();
        const cookieUserData = CookieUtils.getUserData();
        const cookieUSID = CookieUtils.getUSID();

        // Estrategia 1: Verificar que tenemos todos los datos esenciales
        if (
            cookieToken &&
            cookieUserData &&
            storedSessionData?.isAuthenticated
        ) {
            this.token = cookieToken;
            this.conn = cookieUSID || '';
            this.authData = cookieUserData;
            this.basicData = cookieUserData.basic_data;
            this.role = cookieUserData.role_id;

            // Si no tenemos permisos en la cookie (porque se redujeron), usar array vacío
            this.permission = cookieUserData.permission || [];

            // Reconstruir userSession básica
            this.userSession = {
                access: {
                    accessToken: this.token,
                    conn: this.conn,
                },
                permissions: cookieUserData,
                user: cookieUserData,
            } as any;
        } 
        // Estrategia 2: Si tenemos al menos el USID (para notificaciones cross-subdomain)
        else if (cookieUSID) {
            this.conn = cookieUSID;
        }
    }

    public static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            // console.log('GetInstance Shooting');
            SessionManager.instance = new SessionManager();
            // Cargar datos de cookies inmediatamente
            SessionManager.instance.gettingSessionFromCookies();
        }
        return SessionManager.instance;
    }

    // Método público para refrescar la sesión desde cookies
    // Útil para detectar cambios de sesión cross-tab o cross-subdomain
    public refreshSessionFromCookies(): void {
        this.gettingSessionFromCookies();
    }

    public async login(credentials: { email: string; password: string }) {
        try {
            const { data }:ResponseApiDing<DataUserLoginResponse> = await fetchData('/manage-auth/signin', 'POST', credentials)

            this.userSession = data
            this.token = data.access.accessToken
            this.two_factor = data.two_factor
            this.conn = SessionManager.encrypter.decrypt(data.access.conn)!.data as string
            const permissions =  SessionManager.encrypter.decrypt(this.userSession.permissions)?.data as User
            if( permissions ){
                this.authData = permissions
                this.role = permissions.role_id
                this.permission = permissions.permission
            }
            
            // Guardar en cookies en lugar de sessionStorage
            CookieUtils.setSessionData({
                isAuthenticated: true,
                timestamp: Date.now()
            }, 7);
            
            CookieUtils.setAccessToken(this.token, 7);
            CookieUtils.setUSID(this.conn, 7);
            CookieUtils.setUserData(permissions, 7);

            // Notificar a otras pestañas sobre el login
            const crossTabManager = CrossTabCookieManager.getInstance();
            crossTabManager.broadcastLogin();

        } catch (error) {
            console.error(error, 'Nivel 1');
            throw error;
        }
    }

    public async logout() {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        try {
            // Notificar a otras pestañas antes del logout
            const crossTabManager = CrossTabCookieManager.getInstance();
            crossTabManager.broadcastLogout();
            
            await fetchData('/manage-auth/signout', 'GET', null, this.token)
            this.userSession = null;
            CookieUtils.clearSessionCookies();
            this.authData = null
            this.conn =''
            this.token = ''
            this.role = 0
            this.userSession = null
            this.permission = []
            return true;
        } catch (error) {
            CookieUtils.clearSessionCookies();
            console.error(error, 'SessionManager-Logout');
            return false;
        }
    }

    public getSessionData():DataUserLoginResponse | null {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        return this.userSession;
    }

    public getToken(): string | null {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        return this.token
    }

    public getConn(): string | null {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        return this.conn
    }

    public isAuthenticated(): boolean {
        return this.getSessionData() !== null;
    }

    public getPermissions() {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }

        return this.permission
    }

    public getRole() {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        return this.role;
    }

    public getAuthData(): User | null {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        return this.authData;
    }

    public getBasicData(): BasicData | null {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
        }
        return this.basicData;
    }

    public hasTwoFactorAuthenticate(): boolean {
        if (!this.userSession) {
            this.gettingSessionFromCookies()
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
