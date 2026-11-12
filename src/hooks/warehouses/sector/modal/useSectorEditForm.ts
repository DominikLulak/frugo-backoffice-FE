import type {WarehouseSector} from "../../../../types/warehouse.ts";
import {useState} from "react";
import useSectorTypesList from "../../sectorType/useSectorTypesList.ts";
import useSectorFormValidation, {type SectorFormErrors} from "./useSectorFormValidation.ts";
import useSectorFormSubmit from "./useSectorFormSubmit.ts";

type Props = {
    warehouseId: number;
    sector: WarehouseSector | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useSectorEditForm({
    warehouseId, onSaved, onClose, sector
}:Props){
    const {sectorTypes, loadingSectorTypes, sectorTypesError} = useSectorTypesList()

    const [code, setCode] = useState(sector?.code ?? "")
    const [name, setName] = useState(sector?.name ?? "")
    const [description, setDescription] = useState(sector?.description ?? "")
    const [sectorTypeId, setSectorTypeId] = useState<number | null>(sector?.sectorTypeId ?? null)

    const [errors, setErrors] = useState<SectorFormErrors>({})

    const {validateForm} = useSectorFormValidation({code, name, sectorTypeId})
    const isEditing = sector !== null;

    const {saving, saveError, handleSubmit} = useSectorFormSubmit(
        {warehouseId, sectorId: sector?.id ?? 0, isEditing, onSaved, onClose})

    const handleSave = async () => {
        const validationErrors = validateForm()
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0){return}

        await handleSubmit({
            code, name, sectorTypeId: sectorTypeId!, description
        })
    }
    return{
        code, setCode, name, setName, description, setDescription,
        saving, errors, saveError, isEditing, handleSave,
        sectorTypeId, setSectorTypeId,
        sectorTypes, loadingSectorTypes, sectorTypesError
    }

}