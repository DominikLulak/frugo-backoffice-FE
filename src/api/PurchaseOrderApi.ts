import type {
    PurchaseOrder,
    PurchaseOrderCreateDto,
    PurchaseOrderDetail, PurchaseOrderItem, PurchaseOrderItemCreateDto,
    PurchaseOrderStatusChange
} from "../types/purchaseOrder.ts";
import {apiRequest} from "./ApiClient.ts";

export const getPurchaseOrders = async (
    purchaseOrderNumber: string = "",
    supplierName: string = "",
    employeeName: string = "",
    statusCode: string = ""
):Promise<PurchaseOrder[]> => {
    const params = new URLSearchParams()

    if(purchaseOrderNumber) params.append("purchaseOrderNumber", purchaseOrderNumber)
    if(supplierName) params.append("supplierName", supplierName)
    if(employeeName) params.append("employeeName", employeeName)
    if(statusCode) params.append("statusCode", statusCode)

    const query = params.toString()
    const endpoint = `/api/admin/purchaseOrder${query ? `?${query}` : ""}`

    return apiRequest<PurchaseOrder[]>(endpoint);
}

export const getPurchaseOrderDetail = async (
    purchaseOrderId: number
):Promise<PurchaseOrderDetail> => {

    return apiRequest<PurchaseOrderDetail>(
        `/api/admin/purchaseOrder/${purchaseOrderId}`
    )
}

export const createPurchaseOrder = async (
    data: PurchaseOrderCreateDto
):Promise<PurchaseOrder> => {

    return apiRequest<PurchaseOrder>(
        `/api/admin/purchaseOrder`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updatePurchaseOrderItem = async (
    purchaseOrderId: number,
    itemId: number,
    countryId: number,
    quantity: number
):Promise<void> => {

    return apiRequest<void>(
        `/api/admin/purchaseOrder/${purchaseOrderId}/items/${itemId}`,
        {
            method: "PUT",
            body: {
                countryId,
                quantity
            }
        }
    )
}

export const addPurchaseOrderItem = async (
    purchaseOrderId: number,
    item: PurchaseOrderItemCreateDto
):Promise<PurchaseOrderItem> => {

    return apiRequest<PurchaseOrderItem>(
        `/api/admin/purchaseOrder/${purchaseOrderId}/items`,
        {
            method: "POST",
            body: item
        }
    )
}

export const deletePurchaseOrderItem = async (
    purchaseOrderId: number,
    itemId: number
):Promise<void> => {

    return apiRequest<void>(
        `/api/admin/purchaseOrder/${purchaseOrderId}/items/${itemId}`,
        {
            method: "DELETE",
        }
    )
}

export const deletePurchaseOrder = async (
    purchaseOrderId: number
):Promise<void> => {

    return apiRequest<void>(
        `/api/admin/purchaseOrder/${purchaseOrderId}`,
        {
            method: "DELETE"
        }
    )
}

export const updatePurchaseOrder = async (
    purchaseOrderId: number,
    supplierId: number
):Promise<void> => {

    return apiRequest<void>(
        `/api/admin/purchaseOrder/${purchaseOrderId}`,
        {
            method: "PUT",
            body: {supplierId}
        }
    )
}

export const changePurchaseOrderStatus = async (
    purchaseOrderId: number,
    data: PurchaseOrderStatusChange
):Promise<void> => {

    return apiRequest<void>(
        `/api/admin/purchaseOrder/${purchaseOrderId}/status`,
        {
            method: "PATCH",
            body: data
        }
    )
}