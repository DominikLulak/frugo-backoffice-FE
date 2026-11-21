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
    const endpoint = `/api/admin/purchaseOrders${query ? `?${query}` : ""}`

    return apiRequest<PurchaseOrder[]>(endpoint);
}

export const getPurchaseOrderDetail = async (
    purchaseOrderId: number
):Promise<PurchaseOrderDetail> => {

    return apiRequest<PurchaseOrderDetail>(
        `/api/admin/purchaseOrders/${purchaseOrderId}`
    )
}

export const downloadPurchaseOrderPdf = async (
    purchaseOrderId: number
):Promise<void> => {
    const blob = await apiRequest<Blob>(
        `/api/admin/purchaseOrders/${purchaseOrderId}/pdf`,
        {
            responseType: "blob"
        }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a")
    link.href = url;
    link.download = `purchase-order-${purchaseOrderId}.pdf`

    document.body.appendChild(link);
    link.click()
    link.remove()

    window.URL.revokeObjectURL(url)
}

export const createPurchaseOrder = async (
    data: PurchaseOrderCreateDto
):Promise<PurchaseOrder> => {

    return apiRequest<PurchaseOrder>(
        `/api/admin/purchaseOrders`,
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
        `/api/admin/purchaseOrders/${purchaseOrderId}/items/${itemId}`,
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
        `/api/admin/purchaseOrders/${purchaseOrderId}/items`,
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
        `/api/admin/purchaseOrders/${purchaseOrderId}/items/${itemId}`,
        {
            method: "DELETE",
        }
    )
}

export const deletePurchaseOrder = async (
    purchaseOrderId: number
):Promise<void> => {

    return apiRequest<void>(
        `/api/admin/purchaseOrders/${purchaseOrderId}`,
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
        `/api/admin/purchaseOrders/${purchaseOrderId}`,
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
        `/api/admin/purchaseOrders/${purchaseOrderId}/status`,
        {
            method: "PATCH",
            body: data
        }
    )
}