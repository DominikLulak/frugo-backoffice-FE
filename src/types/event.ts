export type StockMovement = {
    id: number;
    eventCode: string;
    etiNumber: string;
    createdAt: string;
    quantity: number;
    fromLocation: string;
    toLocation: string;
    employeeNumber: string;
}

export type StockMovementDetail = {
    id: number;
    createdAt: string;
    eventCode: string;
    eventName: string;
    eventDescription: string;
    etiNumber: string;
    newEtiNumber: string;
    quantity: number;
    fromLocation: string;
    toLocation: string;
    employeeNumber: string;
    employeeName: string;
    palletNumber: string;
    orderNumber: string;
    shipmentNumber: string;
    purchaseOrderNumber: string;
}

export type EventLog = {
    id: number;
    eventCode: string;
    createdAt: string;
    employeeName: string;
    description: string;
}

export type EventLogEntity = {
    entityType: string;
    entityId: number;
}

export type EventLogStep = {
    id: number;
    stepNumber: number;
    createdAt: string;
    finishedAt: string;
    name: string;
    description: string;
    status: string;
    errorCode: string | null;
    errorMessage: string | null;
    data: Record<string, unknown> | null;
}

export type EventLogDetail = {
    id: number;
    createdAt: string;
    finishedAt: string | null;
    status: string;
    eventCode: string;
    eventName: string;
    eventDescription: string;
    employeeNumber: string;
    employeeName: string;
    description: string;
    data: Record<string, unknown>;
    entities: EventLogEntity[];
    steps: EventLogStep[];
}

export type PurchaseOrderStatusHistory = {
    id: number;
    purchaseOrderNumber: string;
    oldStatusCode: string;
    newStatusCode: string;
    changedAt: string;
    employeeName: string;
    note: string;
}

export type OrderStatusHistory = {
    id: number;
    orderNumber: string;
    oldStatusCode: string;
    newStatusCode: string;
    changedAt: string;
    employeeName: string;
    note: string;
}