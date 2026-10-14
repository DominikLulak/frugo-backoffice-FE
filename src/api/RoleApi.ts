import type {Role, RoleCreateDto, RoleDetail} from "../types/role.ts";
import {apiRequest} from "./ApiClient.ts";

export const getRoles = async ():Promise<Role[]> => {
    return apiRequest<Role[]>(
        `/api/admin/roles`
    )
}

export const getRoleDetail = async (
    roleId: number
):Promise<RoleDetail> => {
    return apiRequest<RoleDetail>(
        `/api/admin/roles/${roleId}`
    )
}

export const createRole = async (
    data: RoleCreateDto
):Promise<Role> => {
    return apiRequest<Role>(
        `/api/admin/roles`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateRole = async (
    id: number,
    data: RoleCreateDto
):Promise<Role> => {
    return apiRequest<Role>(
        `/api/admin/roles/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const addPermissionToRole = async (
    roleId: number,
    permissionId: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/roles/${roleId}/permissions/${permissionId}`,
        {
            method: "POST"
        }
    )
}

export const removePermissionFromRole = async (
    roleId: number,
    permissionId: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/roles/${roleId}/permissions/${permissionId}`,
        {
            method: "DELETE"
        }
    )
}