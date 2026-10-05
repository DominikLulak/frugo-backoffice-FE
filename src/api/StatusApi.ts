import {API_URL} from "./config.ts";
import type {Status} from "../types/referenceData.ts";

export const getStatuses = async (): Promise<Status[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/statuses`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch statuses!")
    }
    return await res.json() as Promise<Status[]>
}