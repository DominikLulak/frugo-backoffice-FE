import {useState} from "react";
import {addRoleToUser} from "../../../../api/UserApi.ts";

type Props = {
    userId: number;
    onSaved: () => void | Promise<void>;
    onClose: () => void;
}

export default function useUserAddRole({userId, onSaved, onClose}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleAddRole = async (
        roleId: number
    )=> {
        if(roleId === null || saving) return

        setSaveError("")

        try{
            setSaving(true)

            await addRoleToUser(userId, roleId)
            await onSaved()
            onClose()
        }catch{
            setSaveError("Nepodarilo se pridat roli uzivateli")
        }finally {
            setSaving(false)
        }
    }

    return{saving, saveError, handleAddRole}
}