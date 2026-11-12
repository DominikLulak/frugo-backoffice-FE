import type {User, UserDetail} from "../types/role.ts";
import {apiRequest} from "./ApiClient.ts";

export const getUsers = async ():Promise<User[]> => {
    return apiRequest<User[]>(
        `/api/admin/users`
    )
}

export const getUserDetail = async (
    userId: number
):Promise<UserDetail> => {
    return apiRequest<UserDetail>(
        `/api/admin/users/${userId}`
    )
}

export const addRoleToUser = async (
    userId: number,
    roleId: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/users/${userId}/roles/${roleId}`,
        {
            method: "POST"
        }
    )
}
export const removeRoleFromUser = async (
    userId: number,
    roleId: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/users/${userId}/roles/${roleId}`,
        {
            method: "DELETE"
        }
    )
}
