import {useState} from "react";
import type {OrderProductRow} from "../useOrderModalTableColumns.tsx";
import {deleteOrderItem} from "../../../../api/OrdersApi.ts";

type Props = {
    orderId: number;
    onSaved: () => void | Promise<void>
}

export default function useOrderDeleteItem({
    orderId, onSaved
}:Props){
    const [itemToDelete, setItemToDelete] = useState<OrderProductRow | null>(null)

    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const openDeleteModal = (product: OrderProductRow) => {
        setItemToDelete(product)
        setDeleteError("")
    }

    const closeDeleteModal = () => {
        if(deleting) return

        setItemToDelete(null)
        setDeleteError("")
    }

    const handleDelete = async () => {
        if(!itemToDelete) return

        try {
            setDeleting(true)
            setDeleteError("")

            await deleteOrderItem(
                orderId, itemToDelete.productId
            )
            await onSaved()
            setItemToDelete(null)
        }catch{
            setDeleteError("Nepodarilo se odstranit produkt z objednavky")
        }finally {
            setDeleting(false)
        }
    }

    return{
        itemToDelete, deleting, deleteError,
        openDeleteModal, closeDeleteModal, handleDelete
    }
}