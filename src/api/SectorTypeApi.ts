import type {SectorType, SectorTypeCreateDto} from "../types/warehouse.ts";
import {apiRequest} from "./ApiClient.ts";

export const getSectorTypes = async (): Promise<SectorType[]> => {
    return apiRequest<SectorType[]>(
        `/api/admin/warehouses/sectorTypes`
    )
}

export const createSectorType = async (
    data: SectorTypeCreateDto
):Promise<SectorType> => {
    return apiRequest<SectorType>(
        `/api/admin/warehouses/sectorTypes`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateSectorType = async (
    id: number,
    data: SectorTypeCreateDto
):Promise<SectorType> => {
    return apiRequest<SectorType>(
        `/api/admin/warehouses/sectorTypes/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}