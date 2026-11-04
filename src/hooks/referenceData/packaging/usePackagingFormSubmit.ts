import {useState} from "react";
import {createPackaging, updatePackaging} from "../../../api/PackagingApi.ts";

type PackagingFormData = {
    code: string;
    name: string;
    description: string
}

type Props = {
    packagingId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function usePackagingFormSubmit({packagingId, onSaved, onClose, isEditing}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: PackagingFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const packagingData = {
                code: data.code.trim(),
                name: data.name.trim(),
                description: data.description.trim()
            }

            if(isEditing){
                await updatePackaging(packagingId, packagingData)
            }else{
                await createPackaging(packagingData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Typ baleni se nepodarilo upravit"
                    : "Typ baleni se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}