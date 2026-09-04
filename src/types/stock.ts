export type StockItem = {
    id: number;
    categoryCode: string;
    productType: string;
    productName: string;
    productCode: string;
    palletNumber: string;
    etiNumber: string;
    quantity: number;
    allocatedQuantity: number;
    availableQuantity: number;
    expirationDate: string;
    warehouseCode: string;
    locationCode: string
};

export type StockItemDetail = {
    id: number;

    categoryCode: string;
    productType: string;
    productName: string;
    productCode: string;

    palletNumber: string;
    etiNumber: string;

    packagingType: string;
    quantityPerPackage: number;

    subpackageType: string | null;
    quantityPerSubpackage: number | null;

    quantity: number;
    allocatedQuantity: number;
    availableQuantity: number;

    countryOfOrigin: string;

    receivedAt: string;
    expirationDate: string;

    warehouseCode: string;
    locationCode: string;
};