import {API_URL} from "./config.ts";
import type {Shift} from "../types/referenceData.ts";

export const getShifts = async (): Promise<Shift[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/shifts`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch shifts!")
    }
    return await res.json() as Promise<Shift[]>
}