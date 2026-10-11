import type {
    DepartmentCreateDto,
    Department,
    DepartmentDetail,
    JobPositionDetail, JobPositionCreateDto
} from "../types/department.ts";
import {apiRequest} from "./ApiClient.ts";

export const getDepartments = async ():Promise<Department[]> => {
    return apiRequest<Department[]>(
        `/api/admin/departments`
    )
}

export const getDepartmentDetail = async (
    departmentId: number
):Promise<DepartmentDetail> => {
    return apiRequest<DepartmentDetail>(
        `/api/admin/departments/${departmentId}`
    )
}

export const getJobPositionDetail = async (
    jobPositionId: number
):Promise<JobPositionDetail> => {
    return apiRequest<JobPositionDetail>(
        `/api/admin/departments/jobPosition/${jobPositionId}`
    )
}

export const createDepartment = async (
    data: DepartmentCreateDto
):Promise<Department> => {
    return apiRequest<Department>(
        `/api/admin/departments`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateDepartment = async (
    id: number,
    data: DepartmentCreateDto
):Promise<Department> => {
    return apiRequest<Department>(
        `/api/admin/departments/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const addJobPosition = async (
    departmentId: number,
    data: JobPositionCreateDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/departments/${departmentId}/jobPosition`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateJobPosition = async (
    departmentId: number,
    jobPositionId: number,
    data: JobPositionCreateDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/departments/${departmentId}/jobPosition/${jobPositionId}`,
        {
            method: "PUT",
            body: data
        }
    )
}