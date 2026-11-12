import type {Shipment, ShipmentDetail} from "../types/shipment.ts";
import type {PalletDetail} from "../types/pallet.ts";
import {apiRequest} from "./ApiClient.ts";

export const getShipments = async (
    shipmentNumber: string = "",
    orderNumber: string = "",
    statusCode: string = "",
):Promise<Shipment[]> => {
    const params = new URLSearchParams()

    if(shipmentNumber) params.append("shipmentNumber", shipmentNumber)
    if(orderNumber) params.append("orderNumber", orderNumber)
    if(statusCode) params.append("statusCode", statusCode)

    const query = params.toString()
    const endpoint = `/api/admin/shipments${query ? `?${query}` : ""}`

    return apiRequest<Shipment[]>(endpoint)
}

export const getShipmentDetail = async (shipmentId: number):Promise<ShipmentDetail> => {
    return apiRequest<ShipmentDetail>(
        `/api/admin/shipments/${shipmentId}`
    )
}

export const getPalletItems = async (
    palletId: number
): Promise<PalletDetail> => {

    return apiRequest<PalletDetail>(
        `/api/admin/pallets/${palletId}/items`
    )
}