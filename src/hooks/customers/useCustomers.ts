import {useCallback, useEffect, useState} from "react";
import type {Customer} from "../../types/customer.ts";
import {getCustomers} from "../../api/CustomerApi.ts";

export type CustomerFiltersState = {
    name: string;
    companyId: string;
    countryCode: string;
    city: string;
    postalCode: string;
    registered: boolean | null;
}

const initialFilters: CustomerFiltersState = {
    name: "",
    companyId: "",
    countryCode: "",
    city: "",
    postalCode: "",
    registered: null
};

export default function useCustomers(){
    const [customers, setCustomers] = useState<Customer[]>([])
    const [filters, setFilters] = useState<CustomerFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof CustomerFiltersState>(
        key: K,
        value: CustomerFiltersState[K]
    )=>{
        setFilters(previous => ({
            ...previous,
            [key]: value,
        }))
    }

    const fetchCustomers = useCallback(async (
        applyFilters = false,
        filterValues?: CustomerFiltersState
    ) => {
        try{
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getCustomers(
                    filterValues?.name ?? "",
                    filterValues?.companyId ?? "",
                    filterValues?.countryCode ?? "",
                    filterValues?.city ?? "",
                    filterValues?.postalCode ?? "",
                    filterValues?.registered ?? null
                )
                : await getCustomers()

            setCustomers(data)
        }catch {
            setLoadError("Nepodarilo se nacist zakazniky.")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchCustomers()
    }, [fetchCustomers]);

    return{
        customers,
        filters,
        updateFilters,
        fetchCustomers,
        loading,
        loadError
    }
}