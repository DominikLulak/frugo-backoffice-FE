import {API_URL} from "./config.ts";
import type {StockItem} from "../types/stock.ts";

export const getStockItems = async (
    category: string = "",
    name: string = "",
    variant: string = ""
):Promise<StockItem[]> =>{

    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if(category) params.append("category", category)
    if(name) params.append("name", name)
    if(variant) params.append("variant", variant)

    const response = await fetch(
        `${API_URL}/api/admin/products/stock?${params.toString()}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    if(!response.ok){
        throw new Error("Failed to fetch stock items")
    }
    return await response.json()
}