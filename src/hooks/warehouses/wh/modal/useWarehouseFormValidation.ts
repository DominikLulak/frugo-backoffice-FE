export type WarehouseFormErrors = {
    [key: string]: string
}

type Props = {
    code: string;
    name: string;
}

export default function useWarehouseFormValidation({
    code, name
}:Props){
    const validateForm = ():WarehouseFormErrors => {
        const errors: WarehouseFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod skladu"},
            {key: "name", value: name, label: "Nazev skladu"}
        ]

        for(const field of requiredFields){
            const isEmpty =
                typeof field.value === "string"
                    ? field.value.trim() === ""
                    : false
            if(isEmpty){
                errors[field.key] = `${field.label} musi byt vyplnen`
            }
        }
        return errors
    }
    return{validateForm}
}