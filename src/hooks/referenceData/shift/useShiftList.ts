import {useCallback, useEffect, useState} from "react";
import type {Shift} from "../../../types/referenceData.ts";
import {getShifts} from "../../../api/ShiftApi.ts";

export default function useShiftList(){
    const [shifts, setShifts] = useState<Shift[]>([])

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchShifts = useCallback(async () => {
        try {
            setLoading(true)
            setLoadError("")

            const data = await getShifts()

            setShifts(data)
        }catch{
            setLoadError("Nepodarilo se nacist smeny")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchShifts()
    }, [fetchShifts]);

    return{
        shifts, fetchShifts, loading, loadError
    }
}