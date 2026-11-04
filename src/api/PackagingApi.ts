import type {Packaging, PackagingCreateDto} from "../types/product.ts";
import {apiRequest} from "./ApiClient.ts";

export const getPackaging = async ():Promise<Packaging[]> => {

    return apiRequest<Packaging[]>(
        `/api/admin/warehouses/packaging`
    )
}

export const createPackaging = async (
    data: PackagingCreateDto
):Promise<Packaging> => {
    return apiRequest<Packaging>(
        `/api/admin/warehouses/packaging`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updatePackaging = async (
    id: number,
    data: PackagingCreateDto
):Promise<Packaging> => {
    return apiRequest<Packaging>(
        `/api/admin/warehouses/packaging/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}