import type {Employee, EmployeeCreateDto, EmployeeDetail} from "../types/employee.ts";
import {apiRequest} from "./ApiClient.ts";

export const getEmployees = async (
    employeeNumber: string = "",
    name: string = "",
    shiftCode: string = "",
    departmentName: string = "",
    jobPositionName: string = "",
    active: boolean | null = null
):Promise<Employee[]> => {
    const params = new URLSearchParams()

    if(employeeNumber) params.append("employeeNumber", employeeNumber)
    if(name) params.append("name", name)
    if(shiftCode) params.append("shiftCode", shiftCode)
    if(departmentName) params.append("departmentName", departmentName)
    if(jobPositionName) params.append("jobPositionName", jobPositionName)
    if(active !== null ) params.append("isActive", String(active))

    const query = params.toString()
    const endpoint = `/api/admin/employees${query ? `?${query}` : ""}`

    return apiRequest<Employee[]>(endpoint)
}

export const getEmployeeDetail = async (
    employeeId: number
):Promise<EmployeeDetail> => {

    return apiRequest<EmployeeDetail>(
        `/api/admin/employees/${employeeId}`
    )
}

export const createEmployee = async (
    data: EmployeeCreateDto
):Promise<Employee> => {
    return apiRequest<Employee>(
        "/api/admin/employees",
        {
            method: "POST",
            body: data
        }
    )
}

export const updateEmployee = async (
    id: number,
    data: EmployeeCreateDto
):Promise<Employee> => {
    return apiRequest<Employee>(
        `/api/admin/employees/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}