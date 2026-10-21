import {useCallback, useEffect, useState} from "react";
import type {EventLog} from "../../../types/event.ts";
import {getEventLogs} from "../../../api/EventLogApi.ts";

export default function useEventLogList(){
    const [eventLogs, setEventLogs] = useState<EventLog[]>([])

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchEventLogs = useCallback(async () => {
        try {
            setLoading(true)
            setLoadError("")

            const data = await getEventLogs()
            setEventLogs(data)
        }catch{
            setLoadError("Nepodarilo se nacist event logy")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchEventLogs()
    }, [fetchEventLogs]);

    return{
        eventLogs, loading, loadError
    }
}