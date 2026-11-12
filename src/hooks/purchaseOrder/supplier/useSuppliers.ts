import {useEffect, useState} from "react";
import type {Supplier} from "../../../types/supplier.ts";
import {getSuppliers} from "../../../api/SupplierApi.ts";

type UseSupplierOptions = {
    active?: boolean | null;
    enabled?: boolean;
}

export default function useSuppliers({
    active = true, enabled = true
}:UseSupplierOptions = {}){
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [loadingSuppliers, setLoadingSuppliers] = useState(false)
    const [suppliersError, setSuppliersError] = useState("")

    useEffect(() => {
        if(!enabled) return

        let cancelled = false

        const loadSuppliers = async () => {
            try {
                setLoadingSuppliers(true)
                setSuppliersError("")

                const data = await getSuppliers("", "", active)

                if(!cancelled) setSuppliers(data)
            }catch{
                if(!cancelled) setSuppliersError("Nepodarilo se nacist dodavatele")
            }finally {
                if(!cancelled) setLoadingSuppliers(false)
            }
        }

        void loadSuppliers()
        return () => {
            cancelled = true
        }
    }, [active, enabled]);

    return{
        suppliers, loadingSuppliers, suppliersError
    }
}