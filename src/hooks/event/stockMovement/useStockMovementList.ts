import {useCallback, useEffect, useState} from "react";
import type {StockMovement} from "../../../types/event.ts";
import {getStockMovements} from "../../../api/StockMovementApi.ts";

export type StockMovementFiltersState = {
    eventCode: string;
    etiNumber: string;
    fromLocation: string;
    toLocation: string;
    employeeNumber: string;
}

const initialFilters: StockMovementFiltersState = {
    eventCode: "",
    etiNumber: "",
    fromLocation: "",
    toLocation: "",
    employeeNumber: ""
}

export default function useStockMovementList(){
    const [stockMovements, setStockMovements] = useState<StockMovement[]>([])
    const [filters, setFilters] = useState<StockMovementFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof StockMovementFiltersState>(
        key: K,
        value: StockMovementFiltersState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchStockMovements = useCallback(async (
        applyFilters = false,
        filterValue?: StockMovementFiltersState
    ) => {
        try{
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getStockMovements(
                    filterValue?.eventCode ?? "",
                    filterValue?.etiNumber ?? "",
                    filterValue?.fromLocation ?? "",
                    filterValue?.toLocation ?? "",
                    filterValue?.employeeNumber ?? ""
                )
                : await getStockMovements()

            setStockMovements(data)
        }catch{
            setLoadError("Nepodarilo se nacist skladove pohyby")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchStockMovements()
    }, [fetchStockMovements]);

    return{
        stockMovements, filters, updateFilters, fetchStockMovements,
        loading, loadError
    }
}