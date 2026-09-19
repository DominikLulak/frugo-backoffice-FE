import type {SectorType} from "../types/warehouse.ts";
import {API_URL} from "./config.ts";

export const getSectorTypes = async (): Promise<SectorType[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/warehouses/sectorTypes`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch sector types!")
    }
    return await res.json() as Promise<SectorType[]>
}