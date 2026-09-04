export type Pallet = {
    id: number;
    palletNumber: string;
    locationCode: string;
    closed: boolean;
}

export type PalletWarehouseItem = {
    productCode: string;
    categoryCode: string;
    productType: string;
    productName: string;
    etiNumber: string;
    quantity: number;
}