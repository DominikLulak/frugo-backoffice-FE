/**
 * Request DTOs
 * Odpovídají backendovým DTO pro příjem nákupní objednávky.
 */

export type PurchaseOrderReceivingWarehouseItemDto = {
    quantity: number;
    packagingId: number;
    quantityPerPackage: number;
    subpackagingId: number | null;
    quantityPerSubpackage: number | null;
}

export type PurchaseOrderReceivingItemDto = {
    purchaseOrderItemId: number;
    items: PurchaseOrderReceivingWarehouseItemDto[];
}

export type PurchaseOrderReceivingDto = {
    purchaseOrderId: number;
    items: PurchaseOrderReceivingItemDto[];
}

export type PurchaseOrderReceivingItemResultDto = {
    purchaseOrderItemId: number;
    status: string;
    warehouseItemIds: number[];
    errorCode: string | null;
    errorMessage: string | null;
}

export type PurchaseOrderReceivingResultDto = {
    purchaseOrderId: number;
    status: string;
    totalItems: number;
    successfulItems: number;
    failedItems: number;
    items: PurchaseOrderReceivingItemResultDto[];
}

/**
 * Form types
 * Pouze pro lokální stav formuláře ve FE.
 */

export type PurchaseOrderReceivingWarehouseItemForm = {
    clientId: string;
    quantity: number | "";
    packagingId: number | null;
    packageCount: number | "";
    subpackagingId: number | null;
    subpackageCount: number | "";
}

export type PurchaseOrderReceivingItemForm = {
    purchaseOrderItemId: number;
    selected: boolean;
    warehouseItems: PurchaseOrderReceivingWarehouseItemForm[];
}