import type {StockItem, StockItemDetail} from "../types/stock.ts";
import {apiRequest} from "./ApiClient.ts";

export const getStockItems = async (
    productCode: string = "",
    name: string = "",
    category: string = "",
    productType: string = "",
    etiNumber: string = "",
    warehouseCode: string = "",
):Promise<StockItem[]> => {
    const params = new URLSearchParams();

    if(productCode) params.append("productCode", productCode);
    if(name) params.append("name", name);
    if(category) params.append("category", category);
    if(productType) params.append("productType", productType);
    if(etiNumber) params.append("etiNumber", etiNumber);
    if(warehouseCode) params.append("warehouseCode", warehouseCode);

    const query = params.toString()
    const endpoint = `/api/admin/products/stock${query ? `?${query}` : ""}`

    return apiRequest<StockItem[]>(endpoint)
}

export const getStockItemDetail = async (
    stockItemId: number
):Promise<StockItemDetail> => {
    return apiRequest<StockItemDetail>(
        `/api/admin/products/stock/${stockItemId}`
    )
}