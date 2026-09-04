import type {Pallet, PalletWarehouseItem} from "../types/pallet.ts";
import {API_URL} from "./config.ts";

export const getPallets = async (
    palletNumber: string = "",
    locationCode: string = "",
    closed: boolean | null = null
): Promise<Pallet[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(palletNumber) params.append("etiNumber", palletNumber)
    if(locationCode) params.append("locationCode", locationCode)
    if(closed !== null) params.append("isClosed", String(closed))

    const res = await fetch(`${API_URL}/api/admin/pallets?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch pallets!")
    }
    return await res.json() as Promise<Pallet[]>
}

export const getPalletDetail = async (
    palletId: number
):Promise<PalletWarehouseItem[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/pallets/${palletId}/items`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch pallet detail!")
    }
    return await res.json() as Promise<PalletWarehouseItem[]>
}