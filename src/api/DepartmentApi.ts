import type {Department, DepartmentDetail, JobPositionDetail} from "../types/department.ts";
import {API_URL} from "./config.ts";

export const getDepartments = async (): Promise<Department[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/departments`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch departments!")
    }
    return await res.json() as Promise<Department[]>
}

export const getDepartmentDetail = async (
    departmentId: number
):Promise<DepartmentDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/departments/${departmentId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch department detail!")
    }
    return await res.json()
}

export const getJobPositionDetail = async (
    jobPositionId: number
):Promise<JobPositionDetail> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/departments/jobPosition/${jobPositionId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch job position detail!")
    }
    return await res.json()
}