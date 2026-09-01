export type Shipment = {
    id: number;
    shipmentNumber: string;
    orderNumber: string;
    statusCode: string;
}

export type ShipmentPallet = {
    palletId: number;
    palletNumber: string;
    palletClosed: boolean;
    statusCode: string;
}

export type ShipmentDetail = {
    shipmentNumber: string;
    orderNumber: string;
    statusCode: string;
    pallets: ShipmentPallet[];
}

export type PalletWarehouseItem = {
    productCode: string;
    categoryCode: string;
    productType: string;
    productName: string;
    etiNumber: string;
    quantity: number;
}