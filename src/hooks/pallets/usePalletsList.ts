import {useCallback, useEffect, useState} from "react";
import type {Pallet} from "../../types/pallet.ts";
import {getPallets} from "../../api/PalletsApi.ts";

export type PalletsFiltersState = {
    palletNumber: string;
    locationCode: string;
    closed: boolean | null;
}

const initialFilters: PalletsFiltersState = {
    palletNumber: "",
    locationCode: "",
    closed: null
}

export default function usePalletsList(){
    const [pallets, setPallets] = useState<Pallet[]>([])
    const [filters, setFilters] = useState<PalletsFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof PalletsFiltersState>(
        key: K,
        value: PalletsFiltersState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchPallets = useCallback(async (
        applyFilters = false,
        filterValue?: PalletsFiltersState
    ) => {
        try {
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ?await getPallets(
                    filterValue?.palletNumber ?? "",
                    filterValue?.locationCode ?? "",
                    filterValue?.closed ?? null
                )
                : await getPallets()

            setPallets(data)
        }catch{
            setLoadError("Nepodarilo se nacist palety")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchPallets()
    }, [fetchPallets]);

    return{
        pallets, filters, updateFilters, fetchPallets,
        loading, loadError
    }
}