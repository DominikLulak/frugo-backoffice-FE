export type ModulePermissionFormErrors = {
    [key: string]: string;
}

type Props = {
    permissionCode: string;
    permissionName: string;
    permissionDescription: string;
}

export default function useModulePermissionValidation({
    permissionCode, permissionName, permissionDescription
}:Props){
    const validateForm = ():ModulePermissionFormErrors => {
        const errors: ModulePermissionFormErrors = {}

        const requiredFields = [
            {key: "permissionCode", value: permissionCode, label: "Kod opravneni"},
            {key: "permissionName", value: permissionName, label: "Nazev opravneni"},
            {key: "permissionDescription", value: permissionDescription, label: "Popis opravneni"}
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
    return {validateForm}
}

