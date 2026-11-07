import {useCallback, useEffect, useState} from "react";
import type {Warehouse} from "../../../types/warehouse.ts";
import {getWarehouses} from "../../../api/WarehouseApi.ts";

export default function useWarehouseList(){
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchWarehouses = useCallback(async () => {
        try {
            setLoading(true)
            setLoadError("")

            const data = await getWarehouses()
            setWarehouses(data)
        }catch{
            setLoadError("Nepodarilo se nacist sklady")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchWarehouses()
    }, [fetchWarehouses]);

    return{
        warehouses, loading, loadError, fetchWarehouses
    }
}