import {useState} from "react";
import type {PurchaseOrder, PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";
import {getPurchaseOrderDetail} from "../../../api/PurchaseOrderApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function usePurchaseOrderModals({onSaved}:Props){

    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrderDetail | null>(null)

    const [showCreateModal, setShowCreateModal] = useState(false)

    const openDetail = async (purchaseOrder: PurchaseOrder) => {
        const data = await getPurchaseOrderDetail(purchaseOrder.id)
        setSelectedPurchaseOrder(data)
    }

    const closeDetail = () => {
        setSelectedPurchaseOrder(null)
    }

    const openCreate = () => {
        setShowCreateModal(true)
    }

    const closeCreate = () => {
        setShowCreateModal(false)
    }

    const refreshSelectedPurchaseOrder = async () => {
        if(!selectedPurchaseOrder) return
        const data = await getPurchaseOrderDetail(selectedPurchaseOrder.id)
        setSelectedPurchaseOrder(data)
    }

    const handlePurchaseOrderSaved = async () => {
        await onSaved();

        if(selectedPurchaseOrder){
            await refreshSelectedPurchaseOrder()
        }
    }

    return{
        selectedPurchaseOrder, showCreateModal, openDetail, closeDetail,
        openCreate, closeCreate, refreshSelectedPurchaseOrder, handlePurchaseOrderSaved
    }
}