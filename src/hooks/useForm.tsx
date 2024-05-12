
import { LoginData } from "@/types";
import { useState } from "react"
type FormValues = { [key: string]: string } | LoginData;

type UseFormReturn = [
    FormValues,
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    () => void
];

export const useForm = (initialState: FormValues): UseFormReturn => {

    const [values, setValues] = useState<FormValues>(initialState);

    const reset = () => {
        setValues(initialState)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });

    }

    return [values, handleInputChange, reset];

}