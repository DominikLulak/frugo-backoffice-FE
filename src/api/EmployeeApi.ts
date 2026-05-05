import {API_URL} from "./config.ts";

export const getEmployees = async (
    personalNumber = "",
    fullName = "",
    position = "",
    phoneNumber = "",
    shift = ""
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
    return await res.json()
}

export const getEmployeeDetail = async (personalNumber: string)=>{
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/employees/${personalNumber}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.json()
}