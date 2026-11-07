import {useState} from "react";
import {
    createWarehouseSector,
    updateWarehouseSector
} from "../../../../api/WarehouseApi.ts";

type SectorFormData = {
    code: string;
    name: string;
    sectorTypeId: number;
    description: string;
}

type Props = {
    warehouseId: number;
    sectorId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useSectorFormSubmit({
    warehouseId ,sectorId, onSaved, onClose, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: SectorFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const sectorData = {
                code: data.code.trim(),
                name: data.name.trim(),
                sectorTypeId: data.sectorTypeId,
                description: data.description.trim()
            }

            if(isEditing){
                await updateWarehouseSector(warehouseId, sectorId, sectorData)
            }else{
                await createWarehouseSector(warehouseId, sectorData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Sektor se nepodarilo upravit"
                    : "Sektor se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}
