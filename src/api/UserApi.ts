import type {User, UserDetail} from "../types/role.ts";
import {API_URL} from "./config.ts";

export const getUsers = async ():Promise<User[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/users`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch users!")
    }
    return await res.json() as Promise<User[]>
}

export const getUserDetail = async (
    userId: number
):Promise<UserDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch user detail!")
    }
    return await res.json()
}