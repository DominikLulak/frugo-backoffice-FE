import type {Customer, CustomerDetail} from "../types/customer.ts";
import {API_URL} from "./config.ts";

export const getCustomers = async (
    name: string = "",
    companyId: string = "",
    countryCode: string = "",
    city: string = "",
    postalCode: string = "",
    registered: boolean | null = null
): Promise <Customer[]> => {

    const token = localStorage.getItem("token")
    const params = new URLSearchParams()

    if(name) params.append("name", name)
    if(companyId) params.append("companyId", companyId)
    if(countryCode) params.append("countryCode", countryCode)
    if(city) params.append("city", city)
    if(postalCode) params.append("postalCode", postalCode)
    if(registered !== null) params.append("registered", String(registered))

    const res = await fetch(`${API_URL}/api/admin/customers?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch customers!")
    }
    return await res.json() as Promise<Customer[]>
}

export const getCustomerDetail = async (
    customerId: number
):Promise<CustomerDetail> => {

    const token = localStorage.getItem("token")
    const res = await fetch(`${API_URL}/api/admin/customers/${customerId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch customer detail!")
    }

    return await res.json()
}