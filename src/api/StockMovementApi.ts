import type {StockMovement, StockMovementDetail} from "../types/event.ts";
import {API_URL} from "./config.ts";

export const getStockMovements = async (
    eventCode: string = "",
    etiNumber: string = "",
    fromLocation: string = "",
    toLocation: string = "",
    employeeNumber: string = ""
):Promise<StockMovement[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(eventCode) params.append("eventCode", eventCode)
    if(etiNumber) params.append("etiNumber", etiNumber)
    if(fromLocation) params.append("fromLocation", fromLocation)
    if(toLocation) params.append("toLocation", toLocation)
    if(employeeNumber) params.append("employeeNumber", employeeNumber)

    const res = await fetch(`${API_URL}/api/admin/stockMovements?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch stock movements!")
    }
    return await res.json() as Promise<StockMovement[]>
}

export const getStockMovementDetail = async (
    stockMovementId: number
):Promise<StockMovementDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/stockMovements/${stockMovementId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch stock movement detail!")
    }
    return await res.json()
}