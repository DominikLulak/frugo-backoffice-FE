import {useState} from "react";
import type {PurchaseOrderItem} from "../../../../types/purchaseOrder.ts";
import {deletePurchaseOrderItem} from "../../../../api/PurchaseOrderApi.ts";

export default function usePurchaseOrderDeleteItem(
    purchaseOrderId: number,
    onDeleted: () => Promise<void> | void
){
    const [itemToDelete, setItemToDelete] = useState<PurchaseOrderItem | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const openDeleteModal = (item: PurchaseOrderItem) => {
        setDeleteError("")
        setItemToDelete(item)
    }

    const closeDeleteModal = () => {
        if(deleting) return

        setItemToDelete(null)
        setDeleteError("")
    }

    const handleDelete = async () => {
        if (!itemToDelete || deleting) {
            return
        }

        try {
            setDeleting(true)
            setDeleteError("")

            await deletePurchaseOrderItem(
                purchaseOrderId,
                itemToDelete.id
            )

            setItemToDelete(null)
            await onDeleted()
        } catch {
            setDeleteError("Nepodarilo se odstranit polozku")
        } finally {
            setDeleting(false)
        }
    }

    return{
        itemToDelete, deleting, deleteError,
        openDeleteModal, closeDeleteModal, handleDelete
    }
}