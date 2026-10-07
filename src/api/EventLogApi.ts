import type {EventLog, EventLogDetail} from "../types/event.ts";
import {API_URL} from "./config.ts";

export const getEventLogs = async ():Promise<EventLog[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/eventLogs`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch Event Logs!")
    }
    return await res.json() as Promise<EventLog[]>
}

export const getEventLogDetail = async (
    eventLogId: number
):Promise<EventLogDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/eventLogs/${eventLogId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch event log detail!")
    }
    return await res.json()
}