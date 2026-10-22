import {useCallback, useEffect, useState} from "react";
import type {Status} from "../../../types/referenceData.ts";
import {getStatuses} from "../../../api/StatusApi.ts";

export default function useStatusList(){
    const [statuses, setStatuses] = useState<Status[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchStatuses = useCallback(async () => {
        try {
            setLoading(true)
            setError("")

            const data = await getStatuses()
            setStatuses(data)
        }catch{
            setError("Nepodarilo se nacist statusy")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchStatuses()
    }, [fetchStatuses]);

    return{
        statuses, loading, error
    }

}