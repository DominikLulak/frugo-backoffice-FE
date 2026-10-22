import {useCallback, useEffect, useState} from "react";
import type {PurchaseOrderStatusHistory} from "../../../types/event.ts";
import {getPurchaseOrderStatusHistories} from "../../../api/PurchaseOrderStatusHistory.ts";

export type POStatusHistoryList = {
    purchaseOrderNumber: string;
    employeeName: string;
}

const initialFilters: POStatusHistoryList = {
    purchaseOrderNumber: "",
    employeeName: ""
}

export default function usePOStatusHistoryList(){
    const [statusHistories, setStatusHistories] = useState<PurchaseOrderStatusHistory[]>([])
    const [filters, setFilters] = useState<POStatusHistoryList>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof POStatusHistoryList>(
        key: K,
        value: POStatusHistoryList[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchStatusHistories = useCallback(async (
        applyFilters = false,
        filterValue?: POStatusHistoryList
    ) => {
        try{
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getPurchaseOrderStatusHistories(
                    filterValue?.purchaseOrderNumber ?? "",
                    filterValue?.employeeName ?? "",
                )
                : await getPurchaseOrderStatusHistories()

            setStatusHistories(data)
        }catch{
            setLoadError("Nepodarilo se nacist historii zmen statusu")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchStatusHistories
    }, [fetchStatusHistories]);

    return{
        statusHistories, filters, updateFilters, fetchStatusHistories,
        loading, loadError
    }
}