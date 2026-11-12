import {useCallback, useEffect, useState} from "react";
import type {Packaging} from "../../../types/product.ts";
import {getPackaging} from "../../../api/PackagingApi.ts";

export default function usePackagingList(){
    const [packagings, setPackagings] = useState<Packaging[]>([])
    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchPackaging = useCallback(async () => {
        try {
            setLoading(true)
            setLoadError("")

            const data = await getPackaging()
            setPackagings(data)
        }catch{
            setLoadError("Nepodarilo se nacist baleni")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchPackaging()
    }, [fetchPackaging]);

    return{
        packagings, fetchPackaging, loading, loadError
    }
}