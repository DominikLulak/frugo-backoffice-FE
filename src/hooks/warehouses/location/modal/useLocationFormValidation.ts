export type LocationFormErrors = {
    [key: string]: string
}

type Props = {
    code: string;
    canBeOrdered: boolean;
}
 export default function useLocationFormValidation({code, canBeOrdered}:Props){
    const validateForm = ():LocationFormErrors => {
        const errors: LocationFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod pozice"},
            {key: "canBeOrdered", value: canBeOrdered, label: "Lze objednat"},
        ]

        for(const field of requiredFields){
            const isEmpty =
                field.value === null ||
                (typeof field.value === "string" && field.value.trim() === "")
            if(isEmpty){
                errors[field.key] = `${field.label} musi byt vyplnen`
            }
        }
        return errors
    }
     return{validateForm}
 }