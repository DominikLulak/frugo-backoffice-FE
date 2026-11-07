import {useState} from "react";
import {createSectorType, updateSectorType} from "../../../../api/SectorTypeApi.ts";

type SectorTypeFormData = {
    code: string;
    name: string;
    description: string;
}

type Props = {
    sectorTypeId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useSectorTypeFormSubmit({
    sectorTypeId, onSaved, onClose, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: SectorTypeFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const sectorTypeData = {
                code: data.code.trim(),
                name: data.name.trim(),
                description: data.description.trim()
            }

            if(isEditing){
                await updateSectorType(sectorTypeId, sectorTypeData)
            }else{
                await createSectorType(sectorTypeData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Typ sektoru se nepodarilo upravit"
                    : "Typ sektory se nepodarulo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}