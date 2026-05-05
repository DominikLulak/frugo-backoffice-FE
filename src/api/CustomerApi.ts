import {API_URL} from "./config.ts";
import type {Customer, CustomerDetail} from "../types/customer.ts";

export const getCustomers = async (
    customerNumber: string = "",
    name: string = "",
    email: string = "",
    phoneNumber: string = ""
):Promise<Customer[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams();

    if(customerNumber) params.append("customerNumber", customerNumber)
    if(name) params.append("name", name)
    if(email) params.append("email", email)
    if(phoneNumber) params.append("phoneNumber", phoneNumber)

    const res = await fetch(`${API_URL}/api/admin/customers?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch customers")
    }
    return await res.json() as Promise<Customer[]>
}

export const getCustomerDetail = async (customerNumber: string) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${customerNumber}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch detail")
    }
    return await res.json() as Promise<CustomerDetail>
}