'use client'
import { CreateUserDataRedux, DataUserLoginResponse, FormNewPassword, LoginResponse, ModulesPermissions, NotificationFromDB, NotificationTitle, ObjectNotification, PasswordChecks, User, UserLoginResponse, UserPermissionsDecrypted } from "@/types"
import EncryptData from "./EncryptData";
import * as env from "./envs";
import SessionManager from "../Classes/SessionManager";



export const path_role = (roleId: number) => {
    if (roleId === 1) return 'admin'
    if (roleId === 2) return 'clients'
}



//
export const getUSID = () => {
    const userData = decryptLoginData();
    const encryptData = new EncryptData();
    if (userData) return encryptData.decrypt(userData.data.access.conn)
}


/// DEVUELVE LOS PERMISOS ENCRYPTADOS ALMACENADOS EN LA BASE DE DATO - INFORMACIÓN IMPORTANTE DEL USUARIO
const getSession = () => {
    (typeof window !== 'undefined')
    const userData = decryptLoginData();
    const encryptData = new EncryptData();
    if (userData) return encryptData.decrypt(userData.data.permissions)
}


// TRAE INFORMACIÓN DEL SESSION STORAGE
export const getFromSessionStorage = (id: string): string | null | false => (typeof window !== "undefined") && sessionStorage.getItem(id)


// SETEA INFORMACIÓN EN EL SESSION STORAGE
export const setInSessionStorage = (id: string, data: any) => (typeof window !== "undefined") && sessionStorage.setItem(id, JSON.stringify(data))


// ENCRIPTA LOS DATOS DE LA SESION EN EL SESSION STORAGE
const encryptLoginDataInSessionStorage = (data: DataUserLoginResponse) => {
    (typeof window !== 'undefined')
    const encrypter = new EncryptData()
    const encryptData = encrypter.encrypt(
        JSON.stringify(data)
    )
    setInSessionStorage('user-login-data', encryptData);
}


/// TRAE LOS DATOS DE LA SESIÓN DEL SESSION STORAGE
const decryptLoginData = () => {
    (typeof window !== 'undefined')
    const encrypter = new EncryptData();
    const loginDataEncrypt = getFromSessionStorage('user-login-data');
    if (loginDataEncrypt) return encrypter.decrypt(JSON.parse(loginDataEncrypt)) as { error: boolean; message?: string; data: DataUserLoginResponse }
}



//// TRAE LOS PERMISOS DEL USUARIO DE UN MODULO EN ESPECIFICO
export const getPermissionsOf = (module: string) => {
    (typeof window !== 'undefined')
    const session = SessionManager.getInstance()
    const userConfigId = session.getPermissionsId()[module]
    const permissionsUserConfig = session.getModuleById(userConfigId)
    return permissionsUserConfig
}


// VALIDA EL FORMULARIO DE REGISTRO
export const formValidate = (formData: CreateUserDataRedux) => {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    let lastNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    // let passwordRegex = /^(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&()_+{}[]:;<>,.?~\/-]).{6,}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let dniRegex = /^\d{8,10}$/;
    let addressRegex = /^[a-zA-Z0-9\s,.'-]{5,}$/;
    let ageRegex = /^\d{1,3}$/;

    const errors = {} as any;
    if (!nameRegex.test(formData.name)) {
        errors.name = 'Nombre Inválido';
    }
    if (!lastNameRegex.test(formData.last_name)) {
        errors.last_name = 'Apellido Inválido';
    }
    if (!emailRegex.test(formData.email)) {
        errors.email = 'Email Inválido';
    }
    if (!passwordRegex.test(formData.password)) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }
    if (formData.password !== formData.password2) {
        errors.password2 = 'Las contraseñas no coinciden';
    }
    if (!dniRegex.test(formData.dni)) {
        errors.dni = 'DNI Inválido';
    }
    if (!phoneRegex.test(formData.cell_phone)) {
        errors.cell_phone = 'Número Inválido';
    }
    // if ( !phoneRegex.test(formData.cell_phone_secondary)) {
    //     errors.cell_phone_secondary = 'Número Inválido';
    // }
    if (!addressRegex.test(formData.address)) {
        errors.address = 'Dirección Inválida';
    }
    if (!ageRegex.test(formData.age)) {
        errors.age = 'Valor Inválido';
    }
    if (!formData.gender_type) {
        errors.gender_type = 'Debes seleccionar algúna opción';
    }
    if (!formData.two_factor_enabled) {
        errors.two_factor_enabled = 'Debes seleccionar algúna opción';
    }

    return errors
}


// VALIDA LOS PASSWORD PARA EL CAMBIO DE CONTRASEÑA
export const validateNewPassword = (passwordForm: FormNewPassword) => {
    let flag = false;
    const { old_password, new_password, new_password_2 } = passwordForm

    const errors: PasswordChecks = {
        pass_length: (new_password.length >= 8),
        pass_uppercase: (/[A-Z]/.test(new_password)),
        pass_lowercase: (/[a-z]/.test(new_password)),
        pass_specialCaracter: (/[!@#$%^&*(),.?":{}|<>]/.test(new_password)),
        pass_number: (/[0-9]/.test(new_password)),
        pass_2: new_password === new_password_2 && new_password.length > 0,
        pass_new_old: new_password !== old_password
    }

    if (
        errors.pass_length &&
        errors.pass_lowercase &&
        errors.pass_uppercase &&
        errors.pass_number &&
        errors.pass_specialCaracter &&
        new_password === new_password_2 &&
        new_password !== old_password &&
        old_password.length > 5
    ) {
        flag = true
    }
    return {
        errors,
        flag
    }
}


//prepara los valores del usuario a registrar en la base de datos
export const userToRegister = (values: any) => {
    const values2 = { ...values };
    delete values2.password2;
    delete values2.remember;
    values2.two_factor_enabled = JSON.parse(values2.two_factor_enabled)
    return values2
}



export const objToArray = (obj: any) => {
    let arr = []
    for (let prop in obj) arr.push(obj[prop])
    return arr
}


// TRANSFORMA UN DATO EN BASE64
export const base64ToBlob = (dataURI: string) => {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
    return new Blob([ia], { type: mimeString })
}




//REVISA QUE SI UN USUARIO TIENE PERMISOS DE ADMINISTRADOR SEGUN EL MODULO
export const isAdmin = (module: string) => {
    const session = SessionManager.getInstance();
    const userConfigId = session.getPermissionsId()[module]
    const permissionsUserConfig: ModulesPermissions = session.getModuleById(userConfigId)
    let isAdmin = false
    if (permissionsUserConfig) {
        permissionsUserConfig.permission.forEach(p => {
            if (p.action_method === 'PATCH' || p.action_method === 'DELETE') isAdmin = true;
        })
        return isAdmin
    }
    throw new Error('El módulo no existe')
}




// PRIMERA LETRA A MAYUSCULA
export const flu = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);





// GUARDA LAS NOTIFICACIONES EN EL LOCAL STORAGE
export const setNotificationOnLocalStorage = (userId: number | string, data: NotificationFromDB) => {
    const dataToSave = objectNotification(data);

    let arrayNotifications = []
    const strNotifications = localStorage.getItem(`notif-${userId}`)

    if (strNotifications) {
        arrayNotifications = [...JSON.parse(strNotifications), dataToSave]
        if (JSON.parse(strNotifications).length === 30) {
            arrayNotifications.shift()
        }
    } else {
        arrayNotifications = [dataToSave]
    }
    localStorage.setItem(`notif-${userId}`, JSON.stringify(arrayNotifications))
}



// TRAE LAS NOTIFICACIONES DEL LOCAL STORAGE
export const getNotificationsFromLocalStorage = (userId: number | string): ObjectNotification[] => {
    const strNotifications = localStorage.getItem(`notif-${userId}`)
    if (strNotifications) {
        return JSON.parse(strNotifications)
    }
    return []
}




export const getIdFromUSID = (usid: string) => {
    const array = usid.split('*')
    return array[2]
}





export const objectNotification = (data: NotificationFromDB): ObjectNotification => {

    let obj: ObjectNotification = {
        ...data,
        date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}hs`,
        link: '',
        icon: ''
    }

    const getLinkIcon = (title: NotificationTitle | ''): { link: string; icon: string } => {
        switch (title) {
            case 'Actualización del estado de tu cuenta':
                return { link: '/dashboard/user-config', icon: 'simple-icons:authelia' };

            case 'Nueva solicitud de Auditoría de Cliente':
                return { link: '/dashboard/notifications', icon: 'gridicons:user-add' }

            default:
                return { link: '/dashboard/notifications', icon: 'ic:round-notifications-active' };
        }
    }

    switch (data.title) {
        case 'Actualización del estado de tu cuenta':
            obj = {
                ...obj,
                link: getLinkIcon(data.title).link,
                icon: getLinkIcon(data.title).icon
            }
            break;
        default:
            obj = {
                ...obj,
                link: getLinkIcon('').link,
                icon: getLinkIcon('').icon
            };
            break;
    }

    return obj
}








