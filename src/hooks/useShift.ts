import {useEffect, useState} from "react";
import type {Shift} from "../types/referenceData.ts";
import {getShifts} from "../api/ShiftApi.ts";

export default function useShift(){
    const [shifts, setShifts] = useState<Shift[]>([])
    const [loadingShifts, setLoadingShifts] = useState(false);
    const [shiftsError, setShiftsError] = useState("")

    useEffect(() => {
        const loadShifts = async () => {
            try {
                setLoadingShifts(true)
                setShiftsError("")

                const data = await getShifts()
                setShifts(data)
            }catch{
                setShiftsError("Nepodarilo se nacist smeny")
            }finally {
                setLoadingShifts(false)
            }
        }
        void loadShifts()
    }, []);

    return{
        shifts,
        loadingShifts,
        shiftsError
    }
}