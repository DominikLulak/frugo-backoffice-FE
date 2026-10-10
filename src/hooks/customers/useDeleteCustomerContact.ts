import {useState} from "react";
import type {CustomerContact} from "../../types/customer.ts";
import {deleteCustomerContact} from "../../api/CustomerApi.ts";

export default function useDeleteCustomerContact(
    customerId: number,
    onDeleted: () => Promise<void> | void
){
    const [customerContactToDelete, setCustomerContactToDelete] = useState<CustomerContact | null>(null)

    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const openDeleteModal = (contact: CustomerContact) => {
        setDeleteError("")
        setCustomerContactToDelete(contact)
    }

    const closeDeleteModal = () => {
        if(deleting) return

        setCustomerContactToDelete(null)
        setDeleteError("")
    }

    const handleDelete = async () => {
        if(!customerContactToDelete || deleting) return

        try {
            setDeleting(true)
            setDeleteError("")

            await deleteCustomerContact(
                customerId,
                customerContactToDelete.id
            )

            setCustomerContactToDelete(null)
            await onDeleted()
        }catch {
            setDeleteError("Nepodarilo se odstranit kontakt")
        }finally {
            setDeleting(false)
        }
    }

    return{
        customerContactToDelete,
        deleting,
        deleteError,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    }
}