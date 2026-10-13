import type {RoleDetail} from "../../../../types/role.ts";
import {useState} from "react";
import useRoleFormValidation, {type RoleFormErrors} from "./useRoleFormValidation.ts";
import useRoleFormSubmit from "./useRoleFormSubmit.ts";

type Props = {
    roleId: number;
    role: RoleDetail | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useRoleEditForm({
    roleId, role, onClose, onSaved
}:Props){
    const [code, setCode] = useState(role?.code ?? "")
    const [name, setName] = useState(role?.name ?? "")

    const [errors, setErrors] = useState<RoleFormErrors>({})

    const {validateForm} = useRoleFormValidation({code, name})

    const isEditing = role !== null

    const {saving, saveError, handleSubmit} = useRoleFormSubmit({roleId, isEditing, onClose, onSaved})

    const handleSave = async () => {
        const validationsErrors = validateForm()
        setErrors(validationsErrors)

        if(Object.keys(validationsErrors).length > 0) {return}

        await handleSubmit({code, name})
    }

    return{
        code, setCode, name, setName,
        saving, errors, saveError, isEditing, handleSave
    }
}