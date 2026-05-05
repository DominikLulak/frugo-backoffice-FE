export type Order = {
    orderNumber: string;
    status: string;
    customerName: string;
}

export type OrderItem = {
    category: string;
    name: string;
    variant: string;
    quantity: number;
}