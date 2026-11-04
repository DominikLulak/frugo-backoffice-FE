export type PackagingFormErrors = {
    [key: string]: string
}

type Props = {
    code: string;
    name: string;
}

export default function usePackagingFormValidation({
    code, name
}:Props){
    const validateForm = ():PackagingFormErrors => {
        const errors: PackagingFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod typu baleni"},
            {key: "name", value: name, label: "Nazev typu baleni"},
        ]

        for(const field of requiredFields){
            const isEmpty =
                typeof field.value === "string"
                    ? field.value.trim() === ""
                    : false
            if(isEmpty){
                errors[field.key] = `${field.label} musi byt vyplneno`
            }
        }
        return errors;
    }

    return {validateForm}
}