import {useState} from "react";
import {createModule, updateModule} from "../../../../api/ModuleApi.ts";

type ModuleFormData = {
    moduleCode: string;
    moduleName: string
}

type Props = {
    moduleId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useModuleFormSubmit({
    moduleId, isEditing, onClose, onSaved
}:Props){
    const [saving, setSaving] = useState(false)
    const[saveError, setSaveError] = useState("")

    const handleSubmit = async (data: ModuleFormData) => {
        setSaveError("")

        try{
            setSaving(true)

            const moduleData = {
                moduleCode: data.moduleCode.trim(),
                moduleName: data.moduleName.trim()
            }
            if(isEditing){
                await updateModule(moduleId, moduleData)
            }else{
                await createModule(moduleData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Modul se nepodarilo upravit"
                    : "Modul se nepodarulo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}