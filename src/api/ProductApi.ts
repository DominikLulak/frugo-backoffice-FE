import {API_URL} from "./config.ts";
import type {Product} from "../types/product.ts";

export const getProducts = async (
    category: string = "",
    productType: string = "",
    productCode: string = ""
): Promise<Product[]> => {

    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if(category){
        params.append("category", category);
    }
    if(productType){
        params.append("productType", productType);
    }
    if(productCode){
        params.append("productCode", productCode);
    }

    const response = await fetch(
        `${API_URL}/api/admin/products?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if(!response.ok){
        throw new Error("Failed to fetch products!");
    }

    return await response.json();
}