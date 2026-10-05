import {API_URL} from "./config.ts";
import type {Country} from "../types/referenceData.ts";

export const getCountries = async (): Promise<Country[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/countries`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch countries!")
    }
    return await res.json() as Promise<Country[]>
}