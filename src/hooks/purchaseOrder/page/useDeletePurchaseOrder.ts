import {useState} from "react";
import type {PurchaseOrder} from "../../../types/purchaseOrder.ts";
import {deletePurchaseOrder} from "../../../api/PurchaseOrderApi.ts";

export default function useDeletePurchaseOrder(
    onDelete: () => Promise<void>
){
    const [purchaseOrderToDelete, setPurchaseOrderToDelete] = useState<PurchaseOrder | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const openDeleteModal = (purchaseOrder: PurchaseOrder) => {
        setDeleteError("")
        setPurchaseOrderToDelete(purchaseOrder)
    }

    const closeDeleteModal = () => {
        if(deleting) return

        setPurchaseOrderToDelete(null)
        setDeleteError("")
    }

    const handleDelete = async () => {
        if(!purchaseOrderToDelete || deleting) return

        try{
            setDeleting(true)
            setDeleteError("")

            await deletePurchaseOrder(purchaseOrderToDelete.id)

            setPurchaseOrderToDelete(null)
            await onDelete()
        }catch{
            setDeleteError(
                "Nakupni objednavku se nepodarilo smazat"
            )
        }finally {
            setDeleting(false)
        }
    }

    return{
        purchaseOrderToDelete, deleting, deleteError,
        openDeleteModal, closeDeleteModal, handleDelete
    }
}