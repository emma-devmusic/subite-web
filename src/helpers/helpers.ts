import { CreateUserDataRedux, User, UserDataLogin } from "@/types"
import EncryptData, { decryptLoginData } from "./EncryptData";



export const getSession = () => {
    const userData = decryptLoginData();
    const encryptData = new EncryptData(`${process.env.NEXT_PUBLIC_SERVER_SECRET}`);
    return encryptData.decrypt(userData?.data?.permissions);
}

export const getFromSessionStorage = (id: string) => sessionStorage.getItem(id);

export const setInSessionStorage = (id: string, data: any) => {
    sessionStorage.setItem(id, JSON.stringify(data))
}

export const formValidate = (formData: CreateUserDataRedux) => {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    let nameRegex = /^[a-zA-Z\s]{2,}$/;
    let lastNameRegex = /^[a-zA-Z\s]{2,}$/;
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
    if (!phoneRegex.test(formData.cell_phone_secondary)) {
        errors.cell_phone_secondary = 'Número Inválido';
    }
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
    for(let prop in obj) {
        arr.push(obj[prop])
    }
    return arr
}