import type {OrderStatusHistory} from "../types/event.ts";
import {apiRequest} from "./ApiClient.ts";

export const getOrderStatusHistories = async (
    orderNumber: string = "",
    employeeName: string = ""
):Promise<OrderStatusHistory[]> => {
    const param = new URLSearchParams()

    if(orderNumber) param.append("orderNumber", orderNumber)
    if(employeeName) param.append("employeeName", employeeName)

    const query = param.toString()
    const endpoint = `/api/admin/orderStatusHistories${query ? `?${query}` : ""}`

    return apiRequest<OrderStatusHistory[]>(endpoint)
}