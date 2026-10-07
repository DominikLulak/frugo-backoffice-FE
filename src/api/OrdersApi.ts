import {API_URL} from "./config.ts";
import type {Order, OrderItem} from "../types/order.ts";

export const getOrders = async (
    orderNumber: string = "",
    customerName: string = "",
    statusCode: string = ""
):Promise<Order[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams();

    if(orderNumber) params.append("orderNumber", orderNumber)
    if(customerName) params.append("customerName", customerName)
    if(statusCode) params.append("statusCode", statusCode)

    const res = await fetch(`${API_URL}/api/admin/orders?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch orders")
    }
    return await res.json() as Promise<Order[]>
}

export const getOrderDetail = async (orderId: number):Promise<OrderItem[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/items`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch detail")
    }
    return await res.json();
}