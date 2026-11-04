import {useCallback, useEffect, useState} from "react";
import type {SectorType} from "../../../types/warehouse.ts";
import {getSectorTypes} from "../../../api/SectorTypeApi.ts";

export default function useSectorTypesList(){
    const [sectorTypes, setSectorTypes] = useState<SectorType[]>([])
    const [loadingSectorTypes, setLoadingSectorTypes] = useState(false)
    const [sectorTypesError, setSectorTypesError] = useState("")

    const fetchSectorTypes = useCallback(async () => {
        try {
            setLoadingSectorTypes(true)
            setSectorTypesError("")

            const data = await getSectorTypes()

            setSectorTypes(data)
        }catch{
            setSectorTypesError("Nepodarilo se nacist typy sektoru")
        }finally {
            setLoadingSectorTypes(false)
        }
    }, [])

    useEffect(() => {
        void fetchSectorTypes()
    }, [fetchSectorTypes]);

    return{
        sectorTypes, fetchSectorTypes, loadingSectorTypes, sectorTypesError
    }
}