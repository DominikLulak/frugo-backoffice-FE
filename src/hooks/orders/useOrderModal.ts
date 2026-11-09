import {useState} from "react";
import type {Order, OrderDetail} from "../../types/order.ts";
import {getOrderDetail} from "../../api/OrdersApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useOrderModal({onSaved}:Props){
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const openDetail = async (order: Order) => {
        const data = await getOrderDetail(order.id)
        setSelectedOrder(data)
    }

    const closeDetail = () => {
        setSelectedOrder(null)
    }

    const openCreate = () => {
        setShowCreateModal(true)
    }

    const closeCreate = () => {
        setShowCreateModal(false)
    }

    const refreshSelectedOrder = async () => {
        if(!selectedOrder) return

        const data = await getOrderDetail(selectedOrder.id)
        setSelectedOrder(data)
    }

    const handleOrderSaved = async () => {
        await onSaved()

        if(selectedOrder){
            await refreshSelectedOrder()
        }
    }

    return{
        selectedOrder, showCreateModal, openDetail, closeDetail,
        openCreate, closeCreate, refreshSelectedOrder, handleOrderSaved
    }
}