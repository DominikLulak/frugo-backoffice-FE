import {API_URL} from "./config.ts";

export const getOrders = async (
    orderNumber = "",
    status = "",
    customerName = ""
) => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams();

    if(orderNumber) params.append("orderNumber", orderNumber)
    if(status) params.append("status", status)
    if(customerName) params.append("customerName", customerName)

    const res = await fetch(`${API_URL}/api/admin/orders?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return await res.json()
}

export const getOrderDetail = async (orderNumber: string) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/orders/${orderNumber}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.json()
}