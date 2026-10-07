import type {SectorDetail, Warehouse, WarehouseDetail} from "../types/warehouse.ts";
import {API_URL} from "./config.ts";

export const getWarehouses = async (): Promise<Warehouse[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/warehouses`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch warehouses!")
    }
    return await res.json() as Promise<Warehouse[]>
}

export const getWarehouseDetail = async (
    warehouseId: number
):Promise<WarehouseDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/warehouses/${warehouseId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch warehouse detail!")
    }
    return await res.json()
}

export const getSectorLocations = async (
    sectorId: number
):Promise<SectorDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/warehouses/sectors/${sectorId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch sectors!")
    }
    return await res.json()
}