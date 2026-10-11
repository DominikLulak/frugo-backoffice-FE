import {useState} from "react";
import type {EmployeeLogin} from "../../types/employee.ts";
import {deleteLogin} from "../../api/EmployeeApi.ts";

export default function useDeleteEmployeeLogin(
    employeeId: number,
    onDelete: () => Promise<void> | void
){
    const [employeeLoginToDelete, setEmployeeLoginToDelete] = useState<EmployeeLogin | null>(null)

    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const openDeleteModal = (employeeLogin: EmployeeLogin)=> {
        setDeleteError("")
        setEmployeeLoginToDelete(employeeLogin)
    }

    const closeDeleteModal = () => {
        if(deleting) return

        setEmployeeLoginToDelete(null)
        setDeleteError("")
    }

    const handleDelete = async () => {
        if(!employeeLoginToDelete || deleting) return

        try {
            setDeleting(true)
            setDeleteError("")

            await deleteLogin(
                employeeId
            )

            setEmployeeLoginToDelete(null)
            await onDelete()
        }catch {
            setDeleteError("Nepodarilo se smazat login")
        }finally {
            setDeleting(false)
        }
    }

    return{
        employeeLoginToDelete,
        deleting,
        deleteError,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    }
}