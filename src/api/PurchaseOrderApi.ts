import type {PurchaseOrder, PurchaseOrderDetail, PurchaseOrderStatusChange} from "../types/purchaseOrder.ts";
import {API_URL} from "./config.ts";

export interface PurchaseOrderItemCreateDto{
    productId: number;
    quantity: number;
    countryId: number;
}

export interface PurchaseOrderCreateDto{
    supplierId: number;
    items: PurchaseOrderItemCreateDto[];
}

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

export const createPurchaseOrder = async (
    data: PurchaseOrderCreateDto
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(
        `${API_URL}/api/admin/purchaseOrders`,
        {
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    if(!res.ok){
        throw new Error("Failed to create purchase order!")
    }
}

export const updatePurchaseOrderItem = async (
    purchaseOrderId: number,
    itemId: number,
    countryId: number,
    quantity: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}/items/${itemId}`,{
        method: "PUT",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            countryId,
            quantity
        })
    })

    if(!res.ok){
        throw new Error("Failed to update purchase order item!")
    }
}

export const addPurchaseOrderItem = async (
    purchaseOrderId: number,
    item: PurchaseOrderItemCreateDto
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}/items`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })

    if(!res.ok){
        throw new Error("Failed to add purchase order item!")
    }
}

export const deletePurchaseOrderItem = async (
    purchaseOrderId: number,
    itemId: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}/items/${itemId}`,{
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete purchase order item!")
    }
}

export const deletePurchaseOrder = async (
    purchaseOrderId: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const  res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}`, {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete purchase order")
    }
}

export const updatePurchaseOrder = async (
    purchaseOrderId: number,
    supplierId: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}`, {
        method: "PUT",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({supplierId})
    })

    if(!res.ok){
        throw new Error("Failed to update purchase order!")
    }
}

export const changePurchaseOrderStatus = async (
    purchaseOrderId: number,
    data: PurchaseOrderStatusChange
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/purchaseOrders/${purchaseOrderId}/status`,{
        method: "PATCH",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error("Failed to change order status!")
    }
}