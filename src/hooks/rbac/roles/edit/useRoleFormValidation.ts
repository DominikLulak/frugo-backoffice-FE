export type RoleFormErrors = {
    [key: string]: string;
}

type Props = {
    code: string;
    name: string;
}

export default function useRoleFormValidation({code, name}: Props){
    const validateForm = (): RoleFormErrors => {
        const errors: RoleFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod role"},
            {key: "name", value: name, label: "Jmeno role"}
        ]

        for(const filed of requiredFields){
            const isEmpty =
                typeof filed.value === "string"
                    ? filed.value.trim() === ""
                    : false
            if(isEmpty){
                errors[filed.key] = `${filed.label} musi byt vyplneno.`
            }
        }
        return errors;
    }
    return {validateForm}
}