import type {ProductType} from "../types/product.ts";
import {apiRequest} from "./ApiClient.ts";

export const getProductTypes = async (
    categoryId: number
):Promise<ProductType[]> => {
    return apiRequest<ProductType[]>(
        `/api/admin/product-types/category/${categoryId}`
    )
}