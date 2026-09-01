import {API_URL} from "./config.ts";
import type {PalletWarehouseItem, Shipment, ShipmentDetail} from "../types/shipment.ts";

export const getShipments = async (
    shipmentNumber: string = "",
    orderNumber: string = "",
    statusCode: string = "",
):Promise<Shipment[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(shipmentNumber) params.append("shipmentNumber", shipmentNumber)
    if(orderNumber) params.append("orderNumber", orderNumber)
    if(statusCode) params.append("statusCode", statusCode)

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

export const getShipmentDetail = async (shipmentId: number):Promise<ShipmentDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/shipments/${shipmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch detail")
    }
    return await res.json();
}

export const getPalletItems = async (
    palletId: number
): Promise<PalletWarehouseItem[]> => {

    const token = localStorage.getItem("token");

    const res = await fetch(
        `${API_URL}/api/admin/pallets/${palletId}/items`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if(!res.ok){
        throw new Error("Failed to fetch pallet items!");
    }

    return await res.json();
}