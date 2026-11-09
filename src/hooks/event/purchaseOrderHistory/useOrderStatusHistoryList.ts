import {useCallback, useEffect, useState} from "react";
import type {OrderStatusHistory} from "../../../types/event.ts";
import {getOrderStatusHistories} from "../../../api/OrderStatusHistory.ts";

export type OrderStatusHistoryList = {
    orderNumber: string;
    employeeName: string
}

const initialFilters: OrderStatusHistoryList = {
    orderNumber: "",
    employeeName: ""
}

export default function useOrderStatusHistoryList(){
    const [statusHistories, setStatusHistories] = useState<OrderStatusHistory[]>([])
    const [filters, setFilters] = useState<OrderStatusHistoryList>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof OrderStatusHistoryList>(
        key: K,
        value: OrderStatusHistoryList[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchStatusHistories = useCallback(async (
        applyFilters = false,
        filterValue?: OrderStatusHistoryList
    ) => {
        try {
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getOrderStatusHistories(
                    filterValue?.orderNumber ?? "",
                    filterValue?.employeeName ?? ""
                )
                : await getOrderStatusHistories()

            setStatusHistories(data)
        }catch{
            setLoadError("Nepodarilo se nacist historii zmen statusu")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchStatusHistories()
    }, [fetchStatusHistories]);

    return{
        statusHistories, filters, updateFilters, fetchStatusHistories,
        loading, loadError
    }
}