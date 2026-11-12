import {useState} from "react";
import {createWarehouse, updateWarehouse} from "../../../../api/WarehouseApi.ts";

type WarehouseFormData = {
    code: string;
    name: string;
    description: string;
}

type Props = {
    warehouseId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useWarehouseFormSubmit({
    warehouseId, onSaved, onClose, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: WarehouseFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const warehouseData = {
                code: data.code.trim(),
                name: data.name.trim(),
                description: data.description.trim()
            }

            if(isEditing){
                await updateWarehouse(warehouseId, warehouseData)
            }else{
                await createWarehouse(warehouseData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Sklad se nepodarilo upravit"
                    : "Sklad se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}