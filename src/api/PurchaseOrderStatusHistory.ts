import type {PurchaseOrderStatusHistory} from "../types/event.ts";
import {apiRequest} from "./ApiClient.ts";

export const getPurchaseOrderStatusHistories = async (
    purchaseOrderNumber: string = "",
    employeeName: string = ""
):Promise<PurchaseOrderStatusHistory[]> => {

    const param = new URLSearchParams()

    if(purchaseOrderNumber) param.append("purchaseOrderNumber", purchaseOrderNumber)
    if(employeeName) param.append("employeeName", employeeName)

    const query = param.toString()
    const endpoint = `/api/admin/purchaseOrderStatusHistories${query ? `?${query}` : ""}`

    return apiRequest<PurchaseOrderStatusHistory[]>(endpoint)
}