import {useState} from "react";
import {addPermissionToRole} from "../../../../api/RoleApi.ts";

type Props = {
    roleId: number;
    onSaved: () => void | Promise<void>;
    onClose: () => void;
}

export default function useRoleAddPermission({roleId, onSaved, onClose}: Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleAddPermission = async (
        permissionId: number
    ) => {
        if(permissionId === null || saving) return

        setSaveError("")

        try {
            setSaving(true)

            await addPermissionToRole(roleId, permissionId)
            await onSaved();
            onClose();
        }catch{
            setSaveError("Nepodarilo se pridat opravneni k roli")
        }finally {
            setSaving(false)
        }
    }

    return{ saving, saveError, handleAddPermission }
}