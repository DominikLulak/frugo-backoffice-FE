import {useCallback, useEffect, useState} from "react";
import type {Shipment} from "../../types/shipment.ts";
import {getShipments} from "../../api/ShipmentsApi.ts";

export type ShipmentFiltersState = {
    shipmentNumber: string;
    orderNumber: string;
    statusCode: string;
}

const initialFilters: ShipmentFiltersState = {
    shipmentNumber: "",
    orderNumber: "",
    statusCode: ""
}

export default function useShipmentList(){
    const [shipments, setShipments] = useState<Shipment[]>([])
    const [filters, setFilters] = useState<ShipmentFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof ShipmentFiltersState>(
        key: K,
        value: ShipmentFiltersState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchShipments = useCallback(async (
        applyFilters = false,
        filterValue?: ShipmentFiltersState
    ) => {
        try {
            setLoading(false)
            setLoadError("")

            const data = applyFilters
                ? await getShipments(
                    filterValue?.shipmentNumber ?? "",
                    filterValue?.orderNumber ?? "",
                    filterValue?.statusCode ?? ""
                )
                : await getShipments()

            setShipments(data)
        }catch{
            setLoadError("Nepodarilo se nacist zasilky")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchShipments()
    }, [fetchShipments]);

    return{
        shipments, filters, updateFilters, fetchShipments,
        loading, loadError
    }
}