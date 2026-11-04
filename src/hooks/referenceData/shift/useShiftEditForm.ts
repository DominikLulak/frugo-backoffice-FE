import type {Shift} from "../../../types/referenceData.ts";
import {useState} from "react";
import useShiftFormValidation, {type ShiftFormErrors} from "./useShiftFormValidation.ts";
import useShiftFormSubmit from "./useShiftFormSubmit.ts";

type Props = {
    shiftId: number;
    shift: Shift | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useShiftEditForm({
    shiftId,
    shift,
    onSaved,
    onClose
}:Props){
    const [code, setCode] = useState(shift?.code ?? "")
    const [description, setDescription] = useState(shift?.description ?? "")

    const [errors, setErrors] = useState<ShiftFormErrors>({})

    const {validateForm} = useShiftFormValidation({code})

    const isEditing = shift !== null

    const {saving, saveError, handleSubmit} = useShiftFormSubmit({shiftId, isEditing, onClose, onSaved})

    const handleSave = async () => {
        const validationErrors = validateForm()
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0) {return}

        await handleSubmit({
            code, description
        })
    }

    return{
        code, setCode, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    }
}