export type PurchaseOrder = {
    id: number;
    purchaseOrderNumber: string;
    supplierName: string;
    createdAt: string;
    employeeName: string;
    statusCode: string;
}

export type PurchaseOrderItem = {
    categoryCode: string;
    productType: string;
    productName: string;
    countryCode: string;
    quantity: number;
    receivedQuantity: number;
    statusCode: string;
}

export type PurchaseOrderDetail = {
    purchaseOrderNumber: string;
    supplierName: string;
    supplierInternalCode: string;
    createdAt: string;
    employeeName: string;
    statusCode: string;
    items: PurchaseOrderItem[];
}