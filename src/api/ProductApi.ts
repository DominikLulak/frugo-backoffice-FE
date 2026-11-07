import type {Product, ProductCreateDto, ProductSaleStatusDto} from "../types/product.ts";
import {apiRequest} from "./ApiClient.ts";

export const getProducts = async (
    category: string = "",
    productType: string = "",
    productCode: string = ""
): Promise<Product[]> => {
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

    const query = params.toString()
    const endpoint = `/api/admin/products${query ? `?${query}` : ""}`

    return apiRequest<Product[]>(endpoint)
}

export const createProduct = async (
    data: ProductCreateDto
):Promise<Product> => {
    return apiRequest<Product>(
        `/api/admin/products`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateProduct = async (
    id: number,
    data: ProductCreateDto
):Promise<Product> => {
    return apiRequest<Product>(
        `/api/admin/products/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const setProductForSale = async (
    id: number,
    forSale: boolean
):Promise<Product> => {
    return apiRequest<Product>(
        `/api/admin/products/${id}/saleStatus`,
        {
            method: "PATCH",
            body: {forSale} satisfies ProductSaleStatusDto
        }
    )
}