import {useState} from "react";
import type {Customer} from "../../types/customer.ts";
import {deleteCustomer} from "../../api/CustomerApi.ts";

export default function useDeleteCustomer(
    onDelete: () => Promise<void>
){
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)

    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const openDeleteModal = (customer: Customer) => {
        setDeleteError("")
        setCustomerToDelete(customer)
    }

    const closeDeleteModal = () => {
        if(deleting) return

        setCustomerToDelete(null)
        setDeleteError("")
    }

    const handleDelete = async () => {
        if(!customerToDelete || deleting) return

        try{
            setDeleting(true)
            setDeleteError("")

            await deleteCustomer(customerToDelete.id)

            setCustomerToDelete(null)
            await onDelete()
        }catch{
            setDeleteError(
                "Zakaznika se nepodarilo smazat. " +
                "Monza je pouzit v objednavce"
            )
        }finally {
            setDeleting(false)
        }
    }

    return{
        customerToDelete,
        deleting,
        deleteError,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    }
}