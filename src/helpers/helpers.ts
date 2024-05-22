import { CreateUserDataRedux } from "@/types"

export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user') ?? '{}')
}

export const setInSessionStorage = (id: string, data: any) => {
    sessionStorage.setItem(id, JSON.stringify(data))
}

export const formValidate = (formData: CreateUserDataRedux) => {


    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;
    let nameRegex = /^[a-zA-Z\s]{2,}$/;
    let lastNameRegex = /^[a-zA-Z\s]{2,}$/;
    let passwordRegex = /^(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&()_+{}[]:;<>,.?~\/-]).{6,}$/;
 // let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let dniRegex = /^\d{8,10}$/;
    let addressRegex = /^[a-zA-Z0-9\s,.'-]{5,}$/;
    let ageRegex = /^\d{1,3}$/;

    const errors = {} as any;

    if (!nameRegex.test(formData.name)) {
        errors.name = 'Invalid name';
    }
    if (!lastNameRegex.test(formData.last_name)) {
        errors.last_name = 'Invalid last name';
    }
    if (!emailRegex.test(formData.email)) {
        errors.email = 'Invalid email';
    }
    if (!passwordRegex.test(formData.password)) {
        errors.password = 'Invalid password';
    }
    if (formData.password !== formData.password2) {
        errors.password2 = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }
    if (!dniRegex.test(formData.dni)) {
        errors.dni = 'Invalid DNI';
    }
    if (!phoneRegex.test(formData.cell_phone)) {
        errors.cell_phone = 'Invalid cell phone';
    }
    if (formData.cell_phone_secondary && !phoneRegex.test(formData.cell_phone_secondary)) {
        errors.cell_phone_secondary = 'Invalid secondary cell phone';
    }
    if (!addressRegex.test(formData.address)) {
        errors.address = 'Invalid address';
    }
    if (!ageRegex.test(formData.age)) {
        errors.age = 'Invalid age';
    }

    return errors
}