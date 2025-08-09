import EncryptData from '../helpers/EncryptData';

export class CookieUtils {
    private static encrypter = new EncryptData();

    // Nombres de cookies para la sesión
    static readonly COOKIE_NAMES = {
        SESSION: 'auction_session',
        TOKEN: 'auction_token',
        USID: 'auction_usid',
        USER_DATA: 'auction_user_data',
    } as const;

    // Configuración segura para cookies
    private static getSecureOptions(): string {
        const isProduction = process.env.NODE_ENV === 'production';
        return `; Path=/; ${isProduction ? 'Secure; ' : ''}SameSite=Lax; HttpOnly=false`;
    }

    // Verificación de entorno del navegador
    private static isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    }

    // Establecer cookie con expiración
    static setCookie(name: string, value: string, days: number = 7): void {
        if (!this.isBrowser()) return;
        
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        const expiresString = `expires=${expires.toUTCString()}`;

        const simpleCookieString = `${name}=${encodeURIComponent(value)}; ${expiresString}; Path=/`;
        document.cookie = simpleCookieString;

        // Si no se guardó, intentar con configuración más básica
        const verification = this.getCookie(name);
        if (!verification) {
            const basicCookieString = `${name}=${encodeURIComponent(value)}`;
            document.cookie = basicCookieString;
        }
    }

    // Establecer cookie encriptada
    static setEncryptedCookie(
        name: string,
        value: string,
        days: number = 7
    ): void {
        try {
            const jsonValue = JSON.stringify(value);
            const encryptedValue = this.encrypter.encrypt(jsonValue);
            this.setCookie(name, encryptedValue, days);
        } catch (error) {
            console.error('❌ Error setting encrypted cookie:', {
                name,
                error,
            });
        }
    }

    // Obtener cookie
    static getCookie(name: string): string | null {
        if (!this.isBrowser()) return null;
        
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    }

    // Obtener cookie desencriptada
    static getDecryptedCookie(name: string): string | null {
        try {
            const encryptedValue = this.getCookie(name);
            if (!encryptedValue) {
                return null;
            }

            const { data, error, message } =
                this.encrypter.decrypt(encryptedValue);

            if (error) {
                console.error('❌ Error decrypting cookie:', {
                    name,
                    error,
                    message,
                });
                return null;
            }

            return data as string;
        } catch (error) {
            console.error('❌ Exception decrypting cookie:', { name, error });
            return null;
        }
    }

    // Eliminar cookie
    static deleteCookie(name: string): void {
        if (!this.isBrowser()) return;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;`;
    }

    // Verificar si existe una cookie
    static hasCookie(name: string): boolean {
        return this.getCookie(name) !== null;
    }

    // Limpiar todas las cookies de sesión
    static clearSessionCookies(): void {
        Object.values(this.COOKIE_NAMES).forEach((cookieName) => {
            this.deleteCookie(cookieName);
        });
    }

    // Establecer datos de sesión completos
    static setSessionData(sessionData: any, days: number = 7): void {
        const sessionJson = JSON.stringify(sessionData);
        this.setEncryptedCookie(this.COOKIE_NAMES.SESSION, sessionJson, days);
    }

    // Obtener datos de sesión completos
    static getSessionData(): any | null {
        const sessionJson = this.getDecryptedCookie(this.COOKIE_NAMES.SESSION);
        if (!sessionJson) return null;

        try {
            return JSON.parse(sessionJson);
        } catch (error) {
            console.error('Error parsing session data from cookie:', error);
            return null;
        }
    }

    // Establecer token de acceso
    static setAccessToken(token: string, days: number = 7): void {
        this.setEncryptedCookie(this.COOKIE_NAMES.TOKEN, token, days);
    }

    // Obtener token de acceso
    static getAccessToken(): string | null {
        return this.getDecryptedCookie(this.COOKIE_NAMES.TOKEN);
    }

    // Establecer USID
    static setUSID(usid: string, days: number = 7): void {
        this.setEncryptedCookie(this.COOKIE_NAMES.USID, usid, days);
    }

    // Obtener USID
    static getUSID(): string | null {
        return this.getDecryptedCookie(this.COOKIE_NAMES.USID);
    }

    // Establecer datos de usuario
    static setUserData(userData: any, days: number = 7): void {
        const userJson = JSON.stringify(userData);

        // Si los datos son muy grandes, guardar solo lo básico
        if (userJson.length > 3000) {
            // Límite conservador
            const essentialUserData = {
                basic_data: {
                    email: userData.basic_data?.email,
                    name: userData.basic_data?.name,
                    last_name: userData.basic_data?.last_name,
                    phone: userData.basic_data?.phone,
                },
                role_id: userData.role_id,
                timestamp: Date.now(),
            };
            const essentialJson = JSON.stringify(essentialUserData);
            this.setEncryptedCookie(
                this.COOKIE_NAMES.USER_DATA,
                essentialJson,
                days
            );
        } else {
            this.setEncryptedCookie(
                this.COOKIE_NAMES.USER_DATA,
                userJson,
                days
            );
        }
    }

    // Obtener datos de usuario
    static getUserData(): any | null {
        const userJson = this.getDecryptedCookie(this.COOKIE_NAMES.USER_DATA);
        if (!userJson) return null;

        try {
            return JSON.parse(userJson);
        } catch (error) {
            console.error('Error parsing user data from cookie:', error);
            return null;
        }
    }
}
