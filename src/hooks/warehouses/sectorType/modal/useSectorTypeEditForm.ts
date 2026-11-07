import type {SectorType} from "../../../../types/warehouse.ts";
import {useState} from "react";
import useSectorTypeFormValidation, {type SectorTypeFormErrors} from "./useSectorTypeFormValidation.ts";
import useSectorTypeFormSubmit from "./useSectorTypeFormSubmit.ts";

type Props = {
    sectorTypeId: number;
    sectorType: SectorType | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useSectorTypeEditForm({
    sectorType, sectorTypeId, onSaved, onClose
}:Props){
    const [code, setCode] = useState(sectorType?.code ?? "")
    const [name, setName] = useState(sectorType?.name ?? "")
    const [description, setDescription] = useState(sectorType?.description ?? "")
    const [errors, setErrors] = useState<SectorTypeFormErrors>({})

    const {validateForm} = useSectorTypeFormValidation({code, name})
    const isEditing = sectorType !== null

    const {saving, saveError, handleSubmit} = useSectorTypeFormSubmit({sectorTypeId, isEditing, onClose, onSaved})

    const handleSave = async () => {
        const validationErrors = validateForm()
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0){return}

        await handleSubmit({
            code, name, description
        })
    }

    return{
        code, setCode, name, setName, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    }
}