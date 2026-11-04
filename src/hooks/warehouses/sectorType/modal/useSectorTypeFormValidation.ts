export type SectorTypeFormErrors = {
    [key: string]: string
}

type Props = {
    code: string;
    name: string;
}

export default function useSectorTypeFormValidation({
    code, name
}:Props){
    const validateForm = ():SectorTypeFormErrors => {
        const errors: SectorTypeFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod typu sektoru"},
            {key: "name", value: name, label: "Nazev typu sektoru"}
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