export type ModuleFormErrors = {
    [key: string]: string;
}

type Props = {
    moduleCode: string;
    moduleName: string;
}

export default function useModuleFormValidation({moduleCode, moduleName}:Props){
    const validateForm = (): ModuleFormErrors => {
        const errors: ModuleFormErrors = {}

        const requiredFields = [
            {key: "moduleCode", value: moduleCode, label: "Kod modulu"},
            {key: "moduleName", value: moduleName, label: "Nazev modulu"}
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