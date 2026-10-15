import {useCallback, useEffect, useState} from "react";
import type {StockItem} from "../../types/stock.ts";
import {getStockItems} from "../../api/StockApi.ts";

export type StockItemsFiltersState = {
    productCode: string;
    category: string;
    name: string;
    productType: string;
    etiNumber: string;
    warehouseCode: string;
}

const initialFilters: StockItemsFiltersState = {
    productCode: "",
    category: "",
    name: "",
    productType: "",
    etiNumber: "",
    warehouseCode: ""
}

export default function useStockItemsList(){
    const [stockItems, setStockItems] = useState<StockItem[]>([])
    const [filters, setFilters] = useState<StockItemsFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof StockItemsFiltersState>(
        key: K,
        value: StockItemsFiltersState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchStockItems = useCallback(async (
        applyFilters = false,
        filterValue?: StockItemsFiltersState
    ) => {
        try{
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getStockItems(
                    filterValue?.productCode ?? "",
                    filterValue?.category ?? "",
                    filterValue?.name ?? "",
                    filterValue?.productType ?? "",
                    filterValue?.etiNumber ?? "",
                    filterValue?.warehouseCode ?? ""
                )
                : await getStockItems()

            setStockItems(data)
        }catch{
            setLoadError("Nepodarilo se nacit skladove polozky")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchStockItems()
    }, [fetchStockItems]);

    return{
        stockItems, filters, updateFilters, fetchStockItems,
        loading, loadError
    }
}