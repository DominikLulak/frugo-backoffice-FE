import type {PurchaseOrder, PurchaseOrderDetail} from "../types/purchaseOrder.ts";
import {API_URL} from "./config.ts";

export const getPurchaseOrders = async (
    purchaseOrderNumber: string = "",
    supplierName: string = "",
    employeeName: string = "",
    statusCode: string = ""
):Promise<PurchaseOrder[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(purchaseOrderNumber) params.append("purchaseOrderNumber", purchaseOrderNumber)
    if(supplierName) params.append("supplierName", supplierName)
    if(employeeName) params.append("employeeName", employeeName)
    if(statusCode) params.append("statusCode", statusCode)

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch purchase orders!")
    }
    return await res.json() as Promise<PurchaseOrder[]>
}

export const getPurchaseOrderDetail = async (
    purchaseOrderId: number
):Promise<PurchaseOrderDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch detail")
    }
    return await res.json()
}