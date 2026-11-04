import {useState} from "react";
import {createCountry, updateCountry} from "../../../api/CountryApi.ts";

type CountryFormData = {
    code: string;
    name: string;
}

type Props = {
    countryId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useCountryFormSubmit({
    countryId, onSaved, onClose, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: CountryFormData) => {
        setSaveError("")

        try {
            setSaving(true)
            const countryData = {
                code: data.code.trim(),
                name: data.name.trim()
            }

            if(isEditing){
                await updateCountry(countryId, countryData)
            }else{
                await createCountry(countryData)
            }

            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Zemi se nepodarilo upravit"
                    : "Zemi se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}