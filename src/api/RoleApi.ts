import type {Role, RoleDetail} from "../types/role.ts";
import {API_URL} from "./config.ts";

export const getRoles = async (): Promise<Role[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/roles`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch roles!")
    }
    return await res.json() as Promise<Role[]>
}

export const getRoleDetail = async (
    roleId: number
):Promise<RoleDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/roles/${roleId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch role detail!")
    }
    return await res.json()
}