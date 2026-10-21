import {useCallback, useEffect, useState} from "react";
import type {PurchaseOrder} from "../../../types/purchaseOrder.ts";
import {getPurchaseOrders} from "../../../api/PurchaseOrderApi.ts";

export type PurchaseOrderFiltersState = {
    purchaseOrderNumber: string;
    supplierName: string;
    employeeName: string;
    statusCode: string;
}

const initialFilters: PurchaseOrderFiltersState = {
    purchaseOrderNumber: "",
    supplierName: "",
    employeeName: "",
    statusCode: ""
}

export default function usePurchaseOrderList(){
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])
    const [filters, setFilters] = useState<PurchaseOrderFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof PurchaseOrderFiltersState>(
        key: K,
        value: PurchaseOrderFiltersState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchPurchaseOrders = useCallback(async (
        applyFilters = false,
        filterValue?: PurchaseOrderFiltersState
    ) => {
        try {
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getPurchaseOrders(
                    filterValue?.purchaseOrderNumber ?? "",
                    filterValue?.supplierName ?? "",
                    filterValue?.employeeName ?? "",
                    filterValue?.statusCode ?? "",
                )
                : await getPurchaseOrders()

            setPurchaseOrders(data)
        }catch{
            setLoadError("Nepodarilo se nacit nakupni objednaky")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchPurchaseOrders()
    }, [fetchPurchaseOrders]);

    return{
        purchaseOrders, filters, updateFilters, fetchPurchaseOrders,
        loading, loadError
    }
}