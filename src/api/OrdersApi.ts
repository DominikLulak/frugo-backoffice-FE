import {API_URL} from "./config.ts";

export const getOrders = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/orders`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.json()
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