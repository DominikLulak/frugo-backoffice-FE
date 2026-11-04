export type ShiftFormErrors = {
    [key: string]: string
}

type Props = {
    code: string
}

export default function useShiftFormValidation({code}:Props){
    const validateForm = (): ShiftFormErrors => {
        const errors: ShiftFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod smeny"}
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