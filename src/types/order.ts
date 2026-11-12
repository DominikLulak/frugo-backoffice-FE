export type Order = {
    id: number;
    orderNumber: string;
    customerName: string;
    createdAt: string;
    statusCode: string;
}

export type OrderItem = {
    id: number;
    productId: number;
    warehouseItemId: number;

    orderNumber: string;
    warehouseItemCategoryCode: string;
    warehouseItemType: string;
    warehouseItemName: string;
    etiNumber: string;

    quantity: number;
    pickedQuantity: number;
    statusCode: string;
}

export type OrderDetail = {
    id: number;
    orderNumber: string;
    customerId: number;
    customerName: string;
    createdAt: string;
    statusCode: string;
    items: OrderItem[];
}

export type OrderItemCreateDto = {
    productId: number;
    quantity: number;
}

export type OrderCreateDto = {
    customerId: number;
    items: OrderItemCreateDto[];
}

export type OrderItemUpdateDto = {
    quantity: number;
}

export type OrderStatusChangeDto = {
    statusCode: string;
    note: string;
}

export type OrderUpdateDto = {
    customerId: number;
}