export type SectorFormErrors = {
    [key: string]: string
}

type Props = {
    code: string;
    name: string;
    sectorTypeId: number | null;
}

export default function useSectorFormValidation({code, name, sectorTypeId}:Props){
    const validateForm = ():SectorFormErrors => {
        const errors: SectorFormErrors = {}

        const requiredFields = [
            {key: "code", value: code, label: "Kod sektoru"},
            {key: "name", value: name, label: "Nazev sektoru"},
            {key: "sectorTypeId", value: sectorTypeId, label: "Typ sektoru"}
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