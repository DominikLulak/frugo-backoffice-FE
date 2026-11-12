export type CountryFormErrors = {
    [key: string]: string
}

type Props = {
    code: string;
    name: string;
}

export default function useCountryFormValidation({
    code, name
}:Props){
    const validateForm = ():CountryFormErrors => {
        const errors: CountryFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod zeme"},
            {key: "name", value: name, label: "Nazev zeme"}
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
        return errors
    }
    return {validateForm}
}