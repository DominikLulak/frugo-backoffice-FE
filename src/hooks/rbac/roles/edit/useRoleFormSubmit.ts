import {useState} from "react";
import {createRole, updateRole} from "../../../../api/RoleApi.ts";

type RoleFormData = {
    code: string;
    name: string;
}

type Props = {
    roleId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useRoleFormSubmit({
    roleId, isEditing, onClose, onSaved
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: RoleFormData) => {
        setSaveError("")

        try{
            setSaving(true)

            const roleData = {
                code: data.code.trim(),
                name: data.name.trim()
            }
            if(isEditing){
                await updateRole(roleId, roleData)
            }else{
                await createRole(roleData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Roli se nepoarilo upravit."
                    : "Roli se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return {
        saving, saveError, handleSubmit
    }
}