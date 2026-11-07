import type {Category} from "../types/product.ts";
import {apiRequest} from "./ApiClient.ts";

export const getCategories = async ():Promise<Category[]> => {
    return apiRequest<Category[]>(
        `/api/admin/categories`
    )
}
