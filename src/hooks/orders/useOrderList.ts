import {useCallback, useEffect, useState} from "react";
import type {Order} from "../../types/order.ts";
import {getOrders} from "../../api/OrdersApi.ts";

export type OrderFilterState = {
    orderNumber: string;
    customerName: string;
    statusCode: string;
}

const initialFilters: OrderFilterState = {
    orderNumber: "",
    customerName: "",
    statusCode: ""
}

export default function useOrderList(){
    const [orders, setOrders] = useState<Order[]>([])
    const [filters, setFilters] = useState<OrderFilterState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof OrderFilterState>(
        key: K,
        value: OrderFilterState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchOrders = useCallback(async (
        applyFilters = false,
        filterValue?: OrderFilterState
    ) => {
        try {
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getOrders(
                    filterValue?.orderNumber ?? "",
                    filterValue?.customerName ?? "",
                    filterValue?.statusCode ?? ""
                )
                : await getOrders()

            setOrders(data)
        }catch{
            setLoadError("Nepodarilo se nacist objednavky")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchOrders()
    }, [fetchOrders]);

    return{
        orders, filters, updateFilters, fetchOrders,
        loading, loadError
    }
}