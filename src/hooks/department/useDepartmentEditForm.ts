import type {DepartmentDetail} from "../../types/department.ts";
import {useState} from "react";
import {createDepartment, updateDepartment} from "../../api/DepartmentApi.ts";

type Props = {
    departmentId: number;
    department: DepartmentDetail | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useDepartmentEditForm({
    departmentId,
    department,
    onClose,
    onSaved
}:Props){
    type DepartmentFormErrors = {
        [key: string]: string;
    }

    const validateForm = () => {
        const errors: DepartmentFormErrors = {};

        const requiredFields = [
            {key: "name", value: name, label: "Nazev oddeleni"},
            {key: "code", value: code, label: "Kod oddleni"}
        ]
        for(const field of requiredFields){
            const isEmpty =
                typeof field.value === "string"
                    ? field.value.trim() === ""
                    : false;
            if(isEmpty){
                errors[field.key] = `${field.label} musi byt vyplneno.`
            }
        }
        return errors;
    }

    const [name, setName] = useState(department?.name ?? "")
    const [code, setCode] = useState(department?.code ?? "")
    const [description, setDescription] = useState(department?.description ?? "")

    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState<DepartmentFormErrors>({})

    const [saveError, setSaveError] = useState("")

    const isEditing = department !== null

    const handleSave = async () => {
        const validationErrors = validateForm()

        setErrors(validationErrors)
        if(Object.keys(validationErrors).length > 0){
            return
        }

        try{
            setSaving(true)
            if(isEditing){
                await updateDepartment(
                    departmentId,
                    {
                        name: name.trim(),
                        code: code.trim(),
                        description: description.trim()
                    }
                )
            }else{
                await createDepartment({
                    name: name.trim(),
                    code: code.trim(),
                    description: description.trim()
                })
            }
            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Oddeleni se nepodarilo upravit"
                    : "Oddeleni se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }
    return{
        name,
        setName,
        code,
        setCode,
        description,
        setDescription,
        saving,
        errors,
        saveError,
        isEditing,
        handleSave
    }
}