import type {
    Order,
    OrderCreateDto, OrderDetail,
    OrderItemCreateDto,
    OrderItemUpdateDto, OrderStatusChangeDto,
    OrderUpdateDto
} from "../types/order.ts";
import {apiRequest} from "./ApiClient.ts";

export const getOrders = async (
    orderNumber: string = "",
    customerName: string = "",
    statusCode: string = ""
):Promise<Order[]> => {
    const params = new URLSearchParams();

    if(orderNumber) params.append("orderNumber", orderNumber)
    if(customerName) params.append("customerName", customerName)
    if(statusCode) params.append("statusCode", statusCode)

    const query = params.toString()
    const endpoint = `/api/admin/orders${query ? `?${query}` : ""}`

    return apiRequest<Order[]>(endpoint)
}

export const getOrderDetail = async (orderId: number):Promise<OrderDetail> => {

    return apiRequest<OrderDetail>(
        `/api/admin/orders/${orderId}`
    )
}

export const createOrder = async (
    data: OrderCreateDto
): Promise<Order> => {
    return apiRequest<Order>(
        `/api/admin/orders`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateOrder = async (
    orderId: number,
    data: OrderUpdateDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/orders/${orderId}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const addOrderItem = async (
    orderId: number,
    item: OrderItemCreateDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/orders/${orderId}/items`,
        {
            method: "POST",
            body: item
        }
    )
}

export const updateOrderItem = async (
    orderId: number,
    productId: number,
    data: OrderItemUpdateDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/orders/${orderId}/items/${productId}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const deleteOrderItem = async (
    orderId: number,
    productId: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/orders/${orderId}/items/${productId}`,
        {
            method: "DELETE"
        }
    )
}

export const changeOrderStatus = async (
    orderId: number,
    data: OrderStatusChangeDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/orders/${orderId}/status`,
        {
            method: "PATCH",
            body: data
        }
    )
}