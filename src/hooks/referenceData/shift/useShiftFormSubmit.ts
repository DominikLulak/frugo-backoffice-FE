import {useState} from "react";
import {createShift, updateShift} from "../../../api/ShiftApi.ts";

type ShiftFormData = {
    code: string;
    description: string;
}

type Props = {
    shiftId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useShiftFormSubmit({
    shiftId, onSaved, onClose, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: ShiftFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const shiftData = {
                code: data.code.trim(),
                description: data.description.trim()
            }

            if(isEditing){
                await updateShift(shiftId, shiftData)
            }else{
                await createShift(shiftData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Smenu se nepodarilo upravit"
                    : "Smenu se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}