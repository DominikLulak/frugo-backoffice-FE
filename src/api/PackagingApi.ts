import type {Packaging} from "../types/product.ts";
import {API_URL} from "./config.ts";

export const getPackaging = async ():Promise<Packaging[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/warehouses/packaging`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch packaging!")
    }
    return await res.json() as Promise<Packaging[]>
}