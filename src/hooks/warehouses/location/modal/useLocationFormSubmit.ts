import {useState} from "react";
import {createLocation, updateLocation} from "../../../../api/WarehouseApi.ts";

type LocationFormData = {
    code: string;
    aisle: number | null;
    rack: number | null;
    level: number | null;
    position: number | null;
    canBeOrdered: boolean;
}

type Props = {
    locationId: number;
    sectorId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useLocationFormSubmit({
    locationId, sectorId, onSaved, onClose, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: LocationFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const locationData = {
                code: data.code.trim(),
                aisle: data.aisle,
                rack: data.rack,
                level: data.level,
                position: data.position,
                canBeOrdered: data.canBeOrdered
            }

            if(isEditing){
                await updateLocation(locationId, locationData)
            }else{
                await createLocation(sectorId, locationData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Lokaci se nepodarilo upravit"
                    : "Lokaci se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}