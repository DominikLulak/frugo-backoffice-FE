import {API_URL} from "./config.ts";
import type {Employee, EmployeeDetail} from "../types/employee.ts";

export const getEmployees = async (
    personalNumber: string = "",
    fullName: string = "",
    position: string = "",
    phoneNumber: string = "",
    shift: string = ""
) => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams();

    if(personalNumber) params.append("personalNumber", personalNumber)
    if(fullName) params.append("fullName", fullName)
    if(position) params.append("position", position)
    if(phoneNumber) params.append("phoneNumber", phoneNumber)
    if(shift) params.append("shift", shift)

    const res = await fetch(`${API_URL}/api/admin/employees?${params.toString()}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch Employees")
    }
    return await res.json() as Promise<Employee[]>
}

export const getEmployeeDetail = async (personalNumber: string):Promise<EmployeeDetail> =>{
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/employees/${personalNumber}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch employee details")
    }
    return await res.json() as Promise<EmployeeDetail>
}