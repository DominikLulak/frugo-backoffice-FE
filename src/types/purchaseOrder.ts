export type PurchaseOrder = {
    id: number;
    purchaseOrderNumber: string;
    supplierName: string;
    createdAt: string;
    employeeName: string;
    statusCode: string;
}

export type PurchaseOrderItem = {
    id: number;
    categoryCode: string;
    productType: string;
    productName: string;
    countryId: number;
    countryCode: string;
    countryName: string;
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

export type PurchaseOrderItemCreateDto = {
    productId: number;
    quantity: number;
    countryId: number;
}

export type PurchaseOrderCreateDto = {
    supplierId: number;
    items: PurchaseOrderItemCreateDto[];
}