
import { LoginData } from "@/types";
import { useState } from "react"


export const useAppForm = (initialState: any) => {

    const [values, setValues] = useState(initialState);

    const reset = (newState = initialState) => {
        setValues(newState);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setValues({
            ...values,
            [e.target.name]:
                e.target.name === 'gender_type'
                    ? parseInt(e.target.value)
                    // : e.target.name === 'two_factor_enabled'
                    //     ? JSON.parse(e.target.value)
                    : (e.target.type === 'checkbox')
                        ? e.target.checked
                        : e.target.value
        });

    }

    return [values, handleInputChange, reset];

}