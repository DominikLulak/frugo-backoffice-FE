import {API_URL} from "./config.ts";
import type {Shipment} from "../types/shipment.ts";

export const getShipments = async (
    shipmentNumber: string = "",
    orderNumber: string = "",
    status: string = "",
    customerName: string = ""
):Promise<Shipment[]> => {
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
    if(!res.ok){
        throw new Error("Failed to fetch shipments")
    }
    return await res.json() as Promise<Shipment[]>
}