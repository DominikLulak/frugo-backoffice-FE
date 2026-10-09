import type {PurchaseOrderStatusHistory} from "../types/event.ts";
import {API_URL} from "./config.ts";

export const getPurchaseOrderStatusHistories = async (
    purchaseOrderNumber: string = "",
    employeeName: string = ""
):Promise<PurchaseOrderStatusHistory[]> => {
    const token = localStorage.getItem("token")

    const param = new URLSearchParams()

    if(purchaseOrderNumber) param.append("purchaseOrderNumber", purchaseOrderNumber)
    if(employeeName) param.append("employeeName", employeeName)

    const res = await fetch(`${API_URL}/api/admin/purchaseOrderStatusHistories?${param.toString()}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch purchase order status histories")
    }
    return await res.json() as Promise<PurchaseOrderStatusHistory[]>
}