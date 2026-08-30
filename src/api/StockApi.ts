import {API_URL} from "./config.ts";
import type {StockItem, StockItemDetail} from "../types/stock.ts";

export const getStockItems = async (
    productCode: string = "",
    name: string = "",
    category: string = "",
    productType: string = "",
    etiNumber: string = "",
    warehouseCode: string = "",
):Promise<StockItem[]> =>{

    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if(productCode) params.append("productCode", productCode);
    if(name) params.append("name", name);
    if(category) params.append("category", category);
    if(productType) params.append("productType", productType);
    if(etiNumber) params.append("etiNumber", etiNumber);
    if(warehouseCode) params.append("warehouseCode", warehouseCode);

    const response = await fetch(
        `${API_URL}/api/admin/products/stock?${params.toString()}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if(!response.ok){
        throw new Error("Failed to fetch stock items")
    }
    return await response.json()
};

export const getStockItemDetail = async (
    id: number
): Promise<StockItemDetail> => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/api/admin/products/stock/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if(!response.ok){
        throw new Error("Failed to fetch stock item detail");
    }

    return await response.json();
}