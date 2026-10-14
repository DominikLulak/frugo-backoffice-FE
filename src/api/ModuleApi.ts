import type {Module, ModuleCreateDto, ModuleDetail, Permission, PermissionCreateDto} from "../types/role.ts";
import {apiRequest} from "./ApiClient.ts";

export const getModules = async ():Promise<Module[]> => {
    return apiRequest<Module[]>(
        `/api/admin/modules`
    )
}

export const getModuleDetail = async (
    moduleId: number
):Promise<ModuleDetail> => {
    return apiRequest(
        `/api/admin/modules/${moduleId}`
    )
}

export const createModule = async (
    data: ModuleCreateDto
):Promise<Module> => {
    return apiRequest<Module>(
        `/api/admin/modules`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateModule = async (
    moduleId: number,
    data: ModuleCreateDto
):Promise<Module> => {
    return apiRequest<Module>(
        `/api/admin/modules/${moduleId}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const createPermission = async (
    moduleId: number,
    data: PermissionCreateDto
):Promise<Permission> => {
    return apiRequest<Permission>(
        `/api/admin/modules/${moduleId}/permissions`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updatePermission = async (
    permissionId: number,
    data: PermissionCreateDto
):Promise<Permission> => {
    return apiRequest<Permission>(
        `/api/admin/modules/permissions/${permissionId}`,
        {
            method: "PUT",
            body: data
        }
    )
}