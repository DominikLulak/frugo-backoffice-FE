import {useState} from "react";
import type {Shipment, ShipmentDetail} from "../../types/shipment.ts";
import {getShipmentDetail} from "../../api/ShipmentsApi.ts";

export default function useShipmentModal(){
    const [selectedShipment, setSelectedShipment] = useState<ShipmentDetail | null>(null)

    const openDetail = async (shipment: Shipment) => {
        const data = await getShipmentDetail(shipment.id)
        setSelectedShipment(data)
    }

    const closeDetail = () => {
        setSelectedShipment(null)
    }

    return{
        selectedShipment, openDetail, closeDetail
    }
}