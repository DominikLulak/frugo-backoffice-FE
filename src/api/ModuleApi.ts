import type {Module, ModuleDetail} from "../types/role.ts";
import {API_URL} from "./config.ts";

export const getModules = async ():Promise<Module[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/modules`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch modules!")
    }
    return await res.json() as Promise<Module[]>
}

export const getModuleDetail = async (
    moduleId: number
):Promise<ModuleDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/modules/${moduleId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch module detail!")
    }
    return await res.json()
}