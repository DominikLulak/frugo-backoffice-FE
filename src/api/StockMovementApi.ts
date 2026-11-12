import type {StockMovement, StockMovementDetail} from "../types/event.ts";
import {apiRequest} from "./ApiClient.ts";

export const getStockMovements = async (
    eventCode: string = "",
    etiNumber: string = "",
    fromLocation: string = "",
    toLocation: string = "",
    employeeNumber: string = ""
):Promise<StockMovement[]> => {
    const params = new URLSearchParams()

    if(eventCode) params.append("eventCode", eventCode)
    if(etiNumber) params.append("etiNumber", etiNumber)
    if(fromLocation) params.append("fromLocation", fromLocation)
    if(toLocation) params.append("toLocation", toLocation)
    if(employeeNumber) params.append("employeeNumber", employeeNumber)

    const query = params.toString()
    const endpoint = `/api/admin/stockMovements${query ? `?${query}` : ""}`

    return apiRequest<StockMovement[]>(endpoint)
}

export const getStockMovementDetail = async (
    stockMovementId: number
):Promise<StockMovementDetail> => {

    return apiRequest<StockMovementDetail>(
        `/api/admin/stockMovements/${stockMovementId}`
    )
}