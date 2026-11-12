export type Product = {
    id: number;
    categoryId: number;
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

export type Category = {
    id: number;
    name: string;
    code: string;
}

export type ProductType = {
    id: number;
    name: string;
    code: string;
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

export type ProductCreateDto = {
    categoryId: number;
    productTypeName: string;
    productCode: string;
    name: string;
    pricePerUnit: number;
    shelfLifeDays: number;
    reorderPoint: number;
    minimumStock: number;
}

export type ProductSaleStatusDto = {
    forSale: boolean;
}