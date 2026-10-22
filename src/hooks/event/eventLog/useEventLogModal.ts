import type {EventLog, EventLogDetail} from "../../../types/event.ts";
import {getEventLogDetail} from "../../../api/EventLogApi.ts";
import {useState} from "react";

export default function useEventLogModal(){
    const [selectedEventLog, setSelectedEvent] = useState<EventLogDetail | null>(null)

    const openDetail = async (eventLog: EventLog) => {
        const data = await getEventLogDetail(eventLog.id)
        setSelectedEvent(data)
    }

    const closeDetail = () => {
        setSelectedEvent(null)
    }

    return{
        selectedEventLog, openDetail, closeDetail
    }
}