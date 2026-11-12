import type {EventLog, EventLogDetail} from "../types/event.ts";
import {apiRequest} from "./ApiClient.ts";

export const getEventLogs = async ():Promise<EventLog[]> => {

    return apiRequest<EventLog[]>(
        `/api/admin/eventLogs`
    )
}

export const getEventLogDetail = async (
    eventLogId: number
):Promise<EventLogDetail> => {

    return apiRequest<EventLogDetail>(
        `/api/admin/eventLogs/${eventLogId}`
    )
}