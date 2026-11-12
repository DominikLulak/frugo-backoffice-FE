import {useState} from "react";
import {createEmployee, updateEmployee} from "../../../api/EmployeeApi.ts";

type EmployeeFromData = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    birthDate: string;
    shiftId: number;
    jobPositionId: number;
    systemUsername: string;
    phone: string;
    email: string;
}

type Props = {
    employeeId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useEmployeeFormSubmit({
employeeId, isEditing,onClose,onSaved
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: EmployeeFromData) => {
        setSaveError("")

        try{
            setSaving(true)

            const employeeData = {
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                address: data.address.trim(),
                city: data.city.trim(),
                postalCode: data.postalCode.trim(),
                birthDate: data.birthDate.trim(),
                shiftId: data.shiftId,
                jobPositionId: data.jobPositionId,
                systemUsername: data.systemUsername.trim(),
                phone: data.phone.trim(),
                email: data.email.trim()
            }

            if(isEditing){
                await updateEmployee(employeeId, employeeData)
            }else{
                await createEmployee(employeeData)
            }

            onClose()
            await onSaved()
        }catch {
            setSaveError(
                isEditing
                    ? "Zamestnance se nepodarilo upravit"
                    : "Zamestnance se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saving, saveError, handleSubmit
    }
}