import {useEffect, useState} from "react";
import type {Location} from "../../../../types/warehouse.ts";
import useLocationFormValidation, {type LocationFormErrors} from "./useLocationFormValidation.ts";
import useLocationFormSubmit from "./useLocationFormSubmit.ts";

type Props = {
    sectorId: number;
    sectorCode: string;
    location: Location | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useLocationEditForm({
    location, onSaved, onClose, sectorId, sectorCode
}:Props){
    const [code, setCode] = useState(location?.code ?? "")
    const [aisle, setAisle] = useState<number | "">(location?.aisle ?? "")
    const [rack, setRack] = useState<number | "">(location?.rack ?? "")
    const [level, setLevel] = useState<number | "">(location?.level ?? "")
    const [position, setPosition] = useState<number | "">(location?.position ?? "")
    const [canBeOrdered, setCanBeOrdered] = useState(location?.canBeOrdered ?? false)

    const [errors, setErrors] = useState<LocationFormErrors>({})
    const [codeManuallyEdited, setCodeManuallyEdited] = useState(false)

    const isEditing = location !== null

    const {validateForm} = useLocationFormValidation({code, canBeOrdered})

    const {saving, saveError, handleSubmit} = useLocationFormSubmit({
        locationId: location?.id ?? 0, sectorId, onSaved, onClose, isEditing
    })

    useEffect(() => {
        if(isEditing || codeManuallyEdited) return

        const hasAnyPositionValue =
            aisle !== "" ||
            rack !== "" ||
            level !== "" ||
            position !== "";

        if(!hasAnyPositionValue){
            setCode("")
            return;
        }

        setCode(`${sectorCode}-${aisle}-${rack}-${level}-${position}`)
    }, [sectorCode, aisle, rack, level, position, isEditing, codeManuallyEdited]);

    const handleCodeChange = (value: string) => {
        setCode(value)
        setCodeManuallyEdited(value.trim() !== "")
    }

    const handleSave = async () => {
        const validationErrors = validateForm()

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        await handleSubmit({
            code,
            aisle: aisle === "" ? null : aisle,
            rack: rack === "" ? null : rack,
            level: level === "" ? null : level,
            position: position === "" ? null : position,
            canBeOrdered
        })
    }

    return{
        code, setCode: handleCodeChange, aisle, setAisle, rack, setRack, level, setLevel,
        position, setPosition, canBeOrdered, setCanBeOrdered,
        saving, errors, saveError, isEditing, handleSave
    }
}