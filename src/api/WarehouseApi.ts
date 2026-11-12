import type {
    LocationCreateDto,
    SectorDetail,
    Warehouse,
    WarehouseCreateDto,
    WarehouseDetail, WarehouseSector,
    WarehouseSectorCreateDto
} from "../types/warehouse.ts";
import {apiRequest} from "./ApiClient.ts";

export const getWarehouses = async (): Promise<Warehouse[]> => {
    return apiRequest<Warehouse[]>(
        `/api/admin/warehouses`
    )
}

export const getWarehouseDetail = async (
    warehouseId: number
):Promise<WarehouseDetail> => {
    return apiRequest<WarehouseDetail>(
        `/api/admin/warehouses/${warehouseId}`
    )
}

export const getSectorLocations = async (
    sectorId: number
):Promise<SectorDetail> => {
    return apiRequest<SectorDetail>(
        `/api/admin/warehouses/sectors/${sectorId}`
    )
}

export const createWarehouse = async (
    data: WarehouseCreateDto
):Promise<Warehouse> => {
    return apiRequest<Warehouse>(
        `/api/admin/warehouses`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateWarehouse = async (
    id: number,
    data: WarehouseCreateDto
):Promise<Warehouse> => {
    return apiRequest<Warehouse>(
        `/api/admin/warehouses/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const createWarehouseSector = async (
    warehouseId: number,
    data: WarehouseSectorCreateDto
):Promise<WarehouseSector> => {
    return apiRequest<WarehouseSector>(
        `/api/admin/warehouses/${warehouseId}/sectors`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateWarehouseSector = async (
    warehouseId: number,
    sectorId: number,
    data: WarehouseSectorCreateDto
):Promise<WarehouseSector> => {
    return apiRequest<WarehouseSector>(
        `/api/admin/warehouses/${warehouseId}/sectors/${sectorId}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const createLocation = async (
    sectorId: number,
    data: LocationCreateDto
):Promise<Location> => {
    return apiRequest<Location>(
        `/api/admin/warehouses/${sectorId}/locations`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateLocation = async (
    locationId: number,
    data: LocationCreateDto
):Promise<Location> => {
    return apiRequest<Location>(
        `/api/admin/warehouses/locations/${locationId}`,
        {
            method: "PUT",
            body: data
        }
    )
}