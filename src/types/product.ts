export type Product = {
    id: number;
    productCode: string;
    categoryCode: string;
    productType: string;
    productName: string;
    pricePerUnit: number;
    shelfLifeDays: number;
    forSale: boolean;
    availableStock: number;
    reorderPoint: number;
    minimumStock: number;
}

export type Packaging = {
    id: number;
    code: string;
    name: string;
    description: string;
}

export type PackagingCreateDto = {
    code: string;
    name: string;
    description: string;
}