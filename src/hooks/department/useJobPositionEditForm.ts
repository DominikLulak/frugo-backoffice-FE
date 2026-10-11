import type {JobPosition} from "../../types/department.ts";
import {useState} from "react";
import {addJobPosition, updateJobPosition} from "../../api/DepartmentApi.ts";

type Props = {
    departmentId: number;
    position: JobPosition | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useJobPositionEditForm({
    departmentId,
    position,
    onClose,
    onSaved
}:Props){
    const [name, setName] = useState(position?.name ?? "")
    const [code, setCode] = useState(position?.code ?? "")
    const [description, setDescription] = useState(position?.description ?? "")

    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [saveError, setSaveError] = useState("")

    const isEditing = position !== null

    const handleSave = async () => {
        const validationErrors: Record<string, string> = {};

        if(!name.trim()){
            validationErrors.name = "Nazev pozice musi byt vyplnen"
        }
        if(!code.trim()){
            validationErrors.code = "Kod pozice musi byt vyplnen"
        }

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0) return

        try{
            setSaving(true)
            setSaveError("")

            const data = {
                name: name.trim(),
                code: code.trim(),
                description: description.trim()
            }

            if(position){
                await updateJobPosition(
                    departmentId,
                    position.id,
                    data
                )
            }else{
                await addJobPosition(departmentId, data)
            }

            await onSaved()
            onClose()
        }catch{
            setSaveError(
                isEditing
                    ? "Pracovni pozici se nepodarilo upravit"
                    : "Pracovni pozici se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        name,
        setName,
        code,
        setCode,
        description,
        setDescription,
        saving,
        errors,
        saveError,
        isEditing,
        handleSave
    }
}