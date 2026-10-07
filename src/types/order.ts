export type Order = {
    id: number;
    orderNumber: string;
    customerName: string;
    createdAt: string;
    statusCode: string;
}

export type OrderItem = {
    orderNumber: string;
    warehouseItemCategoryCode: string;
    warehouseItemType: string;
    warehouseItemName: string;
    etiNumber: string;
    quantity: number;
    pickedQuantity: number;
    statusCode: string;
}