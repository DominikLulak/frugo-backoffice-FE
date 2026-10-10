import type {CreateCustomerDto, Customer, CustomerContactCrudDto, CustomerDetail} from "../types/customer.ts";
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

export const createCustomer = async (
    data: CreateCustomerDto
):Promise<Customer> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error("Failed to create customer!")
    }
    return await res.json() as Promise<Customer>
}

export const updateCustomer = async (
    id: number,
    data: CreateCustomerDto
):Promise<Customer> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${id}`,{
        method: "PUT",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!res.ok){
        throw new Error("Failed to update customer!")
    }
    return await res.json() as Promise<Customer>
}

export const deleteCustomer = async (
    id: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${id}`,{
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete customer")
    }
}

export const addCustomerContact = async (
    customerId: number,
    item: CustomerContactCrudDto
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${customerId}/customerContacts`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })

    if(!res.ok){
        throw new Error("Failed to create customer!")
    }
}

export const updateCustomerContact = async (
    customerId: number,
    customerContactId: number,
    data: CustomerContactCrudDto
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${customerId}/customerContacts/${customerContactId}`, {
        method: "PUT",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error("Failed to update customer contact!")
    }
}

export const deleteCustomerContact = async (
    customerId: number,
    customerContactId: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${customerId}/customerContacts/${customerContactId}`, {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete customer contact!")
    }
}