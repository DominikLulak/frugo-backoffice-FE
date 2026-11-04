import type {Country} from "../../../types/referenceData.ts";
import {useState} from "react";
import useCountryFormValidation, {type CountryFormErrors} from "./useCountryFormValidation.ts";
import useCountryFormSubmit from "./useCountryFormSubmit.ts";

type Props = {
    countryId: number;
    country: Country | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useCountryEditForm({
    country, countryId, onSaved, onClose
}:Props){
    const [code, setCode] = useState(country?.code ?? "")
    const [name, setName] = useState(country?.name ?? "")
    const [errors, setErrors] = useState<CountryFormErrors>({})

    const {validateForm} = useCountryFormValidation({code, name})
    const isEditing = country !== null;

    const {saving, saveError, handleSubmit} = useCountryFormSubmit({countryId, isEditing, onClose, onSaved})

    const handleSave = async () => {
        const validationErrors = validateForm()
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0){return}

        await handleSubmit({
            code, name
        })
    }

    return{
        code, setCode, name, setName,
        saving, errors, saveError, isEditing, handleSave
    }
}