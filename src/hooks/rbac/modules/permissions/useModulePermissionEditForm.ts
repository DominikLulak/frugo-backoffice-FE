import type {Permission} from "../../../../types/role.ts";
import {useState} from "react";
import useModulePermissionValidation, {type ModulePermissionFormErrors} from "./useModulePermissionValidation.ts";
import useModulePermissionSubmit from "./useModulePermissionSubmit.ts";

type Props = {
    moduleId: number;
    permission: Permission | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useModulePermissionEditForm({
    moduleId,permission,onClose,onSaved
}:Props){
    const [permissionCode, setPermissionCode] = useState(permission?.permissionCode ?? "")
    const [permissionName, setPermissionName] = useState(permission?.permissionName ?? "")
    const [permissionDescription, setPermissionDescription] = useState(permission?.permissionDescription ?? "")

    const [errors, setErrors] = useState<ModulePermissionFormErrors>({})

    const {validateForm} = useModulePermissionValidation({permissionCode, permissionName, permissionDescription})

    const isEditing = permission !== null
    const permissionId = permission?.id ?? null;

    const {saving, saveError, handleSubmit} = useModulePermissionSubmit({moduleId, permissionId, isEditing, onClose, onSaved})

    const handleSave = async () => {
        const validateErrors = validateForm()
        setErrors(validateErrors)

        if(Object.keys(validateErrors).length > 0) {return}

        await handleSubmit({permissionCode, permissionName, permissionDescription})
    }

    return{
        permissionCode, setPermissionCode, permissionName, setPermissionName,
        permissionDescription, setPermissionDescription, saving, errors, saveError,
        isEditing, handleSave
    }
}