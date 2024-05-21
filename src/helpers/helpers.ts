export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user') ?? '{}')
}

export const setInSessionStorage = (id: string, data: any) => {
    sessionStorage.setItem( id, JSON.stringify( data ) )
}

export const formValidate = (form:any) => {



    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g;
    let nameRegex =  /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/g;
    let passwordRegex =/^(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&()_+{}[]:;<>,.?~\/-]).{6,}$/;
    let toCheck = ['email', 'name', 'password', 'phone']
    let arrayErrors:string[] = [];
    let prop:string

    for (prop in form) {
        toCheck.push(prop)
    }

    for (prop in form) {
        toCheck.forEach(e => {
            if(e === prop){
                if(prop === 'email' && !emailRegex.test(form[prop])){
                    arrayErrors.push('*Email incorrecto.');
                }
                if(prop === 'phone' && !phoneRegex.test(form[prop])){
                    arrayErrors.push('*Datos telefónicos incorrectos.');
                }
                if(prop === 'name' && !nameRegex.test(form[prop])) {
                    arrayErrors.push('*Escribe tu nombre y apellido correctamente.');
                }
                if(prop === 'password' && !passwordRegex.test(form[prop])) {
                    arrayErrors.push('*El password debe de ser de al menos 6 dígitos.')
                }
            }
        })        
    }
    return arrayErrors
}