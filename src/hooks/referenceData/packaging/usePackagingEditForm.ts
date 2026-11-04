import type {Packaging} from "../../../types/product.ts";
import {useState} from "react";
import usePackagingFormValidation, {type PackagingFormErrors} from "./usePackagingFormValidation.ts";
import usePackagingFormSubmit from "./usePackagingFormSubmit.ts";

type Props = {
    packagingId: number;
    packaging: Packaging | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function usePackagingEditForm({
    packaging, packagingId, onSaved, onClose,
}:Props){
    const [code, setCode] = useState(packaging?.code ?? "")
    const [name, setName] = useState(packaging?.name ?? "")
    const [description, setDescription] = useState(packaging?.description ?? "")

    const [errors, setErrors] = useState<PackagingFormErrors>({})
    const {validateForm} = usePackagingFormValidation({code, name})

    const isEditing = packaging !== null

    const {saving, saveError, handleSubmit} = usePackagingFormSubmit({packagingId, onSaved, onClose, isEditing})

    const handleSave = async () => {
        const validationErrors = validateForm()
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0) {return}

        await handleSubmit({
            code, name, description
        })
    }

    return{
        code, setCode, name, setName, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    }
}