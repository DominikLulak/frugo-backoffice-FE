import {API_URL} from "./config.ts";

export const getShipments = async (
    shipmentNumber = "",
    orderNumber = "",
    status = "",
    customerName = ""
) => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(shipmentNumber) params.append("shipmentNumber", shipmentNumber)
    if(orderNumber) params.append("orderNumber", orderNumber)
    if(status) params.append("status", status)
    if(customerName) params.append("customerName", customerName)

    const res = await fetch(`${API_URL}/api/admin/shipments?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return await res.json()
}