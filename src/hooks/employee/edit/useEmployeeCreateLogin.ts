import {useState} from "react";
import {createLogin} from "../../../api/EmployeeApi.ts";

type Props = {
    employeeId: number;
    onCreate: () => void | Promise<void>;
}

export default function useEmployeeCreateLogin({employeeId, onCreate}:Props){
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState("")

    const openCreateModal = () => {
        setError("")
        setShowConfirmation(true)
    }

    const closeCreateModal = () => {
        if(creating) return

        setShowConfirmation(false)
        setError("")
    }

    const handleCreate = async () => {
        try{
            setError("")
            setCreating(true)

            await createLogin(employeeId)
            await onCreate()

            setShowConfirmation(false)
        }catch{
            setError("Vytvareni loginu se nepodarilo")
        }finally {
            setCreating(false)
        }
    }

    return{
        showConfirmation,
        creating,
        error,
        openCreateModal,
        closeCreateModal,
        handleCreate
    }
}