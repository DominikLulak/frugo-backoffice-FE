import type {Warehouse} from "../../../../types/warehouse.ts";
import {useState} from "react";
import useWarehouseFormValidation, {type WarehouseFormErrors} from "./useWarehouseFormValidation.ts";
import useWarehouseFormSubmit from "./useWarehouseFormSubmit.ts";

type Props = {
    warehouseId: number;
    warehouse: Warehouse | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useWarehouseEditForm({
    warehouse, warehouseId, onSaved, onClose
}:Props){
    const [code, setCode] = useState(warehouse?.code ?? "")
    const [name, setName] = useState(warehouse?.name ?? "")
    const [description, setDescription] = useState(warehouse?.description ?? "")
    const [errors, setErrors] = useState<WarehouseFormErrors>({})

    const {validateForm} = useWarehouseFormValidation({code, name})
    const isEditing = warehouse !== null

    const {saving, saveError, handleSubmit} = useWarehouseFormSubmit({warehouseId, isEditing, onClose, onSaved})

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