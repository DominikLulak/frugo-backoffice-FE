import type {Supplier} from "../types/supplier.ts";
import {API_URL} from "./config.ts";

export const getSuppliers = async (
    name: string = "",
    internalCode: string = ""
):Promise<Supplier[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(name) params.append("name", name)
    if(internalCode) params.append("internalCode", internalCode)

    const res = await fetch(`${API_URL}/api/admin/suppliers?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch Suppliers!")
    }
    return await res.json() as Promise<Supplier[]>
}