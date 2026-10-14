import type {ModuleDetail} from "../../../../types/role.ts";
import {useState} from "react";
import useModuleFormValidation, {type ModuleFormErrors} from "./useModuleFormValidation.ts";
import useModuleFormSubmit from "./useModuleFormSubmit.ts";

type Props = {
    moduleId: number;
    module: ModuleDetail | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useModuleEditForm({
    moduleId, module, onClose, onSaved
}:Props){
    const [moduleCode, setModuleCode] = useState(module?.moduleCode ?? "")
    const [moduleName, setModuleName] = useState(module?.moduleName ?? "")

    const [errors, setErrors] = useState<ModuleFormErrors>({})

    const {validateForm} = useModuleFormValidation({moduleCode, moduleName})

    const isEditing = module !== null

    const {saving, saveError, handleSubmit} = useModuleFormSubmit({moduleId, isEditing, onClose, onSaved})

    const handleSave = async () => {
        const validateErrors = validateForm()
        setErrors(validateErrors)

        if(Object.keys(validateErrors).length > 0) {return}

        await handleSubmit({moduleCode, moduleName})
    }

    return{
        moduleCode, setModuleCode, moduleName, setModuleName,
        saving, errors, saveError, isEditing, handleSave
    }
}