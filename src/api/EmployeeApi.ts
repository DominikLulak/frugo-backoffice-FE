import {API_URL} from "./config.ts";
import type {Employee, EmployeeDetail} from "../types/employee.ts";

export const getEmployees = async (
    employeeNumber: string = "",
    name: string = "",
    shiftCode: string = "",
    departmentName: string = "",
    jobPositionName: string = "",
    active: boolean | null = null
):Promise<Employee[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(employeeNumber) params.append("employeeNumber", employeeNumber)
    if(name) params.append("name", name)
    if(shiftCode) params.append("shiftCode", shiftCode)
    if(departmentName) params.append("departmentName", departmentName)
    if(jobPositionName) params.append("jobPositionName", jobPositionName)
    if(active !== null ) params.append("isActive", String(active))

    const res = await fetch(`${API_URL}/api/admin/employees?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch employees!")
    }
    return await res.json() as Promise<Employee[]>
}

export const getEmployeeDetail = async (
    employeeId: number
):Promise<EmployeeDetail> => {

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/admin/employees/${employeeId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch employee detail!")
    }

    return await res.json()
}