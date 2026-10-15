import {useState} from "react";
import {createPermission, updatePermission} from "../../../../api/ModuleApi.ts";

type ModulePermissionFormData = {
    permissionCode: string;
    permissionName: string;
    permissionDescription: string;
}

type Props = {
    moduleId: number;
    permissionId: number | null;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useModulePermissionSubmit({
       moduleId, permissionId, isEditing, onClose, onSaved
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: ModulePermissionFormData)=> {
        setSaveError("")

        try{
            setSaving(true)

            const modulePermissionData = {
                permissionCode: data.permissionCode.trim(),
                permissionName: data.permissionName.trim(),
                permissionDescription: data.permissionDescription.trim()
            }
            if(isEditing){
                if(permissionId === null){
                    throw new Error("Chybi ID permission")
                }
                await updatePermission(permissionId, modulePermissionData)
            }else{
                await createPermission(moduleId, modulePermissionData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Permission se nepodarilo upravit"
                    : "Permission se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}