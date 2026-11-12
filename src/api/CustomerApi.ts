import type {CreateCustomerDto, Customer, CustomerContactCrudDto, CustomerDetail} from "../types/customer.ts";
import {apiRequest} from "./ApiClient.ts";

export const getCustomers = async (
    name: string = "",
    companyId: string = "",
    countryCode: string = "",
    city: string = "",
    postalCode: string = "",
    registered: boolean | null = null
): Promise <Customer[]> => {
    const params = new URLSearchParams()

    if(name) params.append("name", name)
    if(companyId) params.append("companyId", companyId)
    if(countryCode) params.append("countryCode", countryCode)
    if(city) params.append("city", city)
    if(postalCode) params.append("postalCode", postalCode)
    if(registered !== null) params.append("registered", String(registered))

    const query = params.toString()
    const endpoint = `/api/admin/customers${query ? `?${query}` : ""}`

    return apiRequest<Customer[]>(endpoint);
}

export const getCustomerDetail = async (
    customerId: number
):Promise<CustomerDetail> => {
    return apiRequest<CustomerDetail>(
        `/api/admin/customers/${customerId}`
    )
}

export const createCustomer = async (
    data: CreateCustomerDto
):Promise<Customer> => {
    return apiRequest<Customer>(
        "/api/admin/customers",
        {
            method: "POST",
            body: data
        }
    )
}

export const updateCustomer = async (
    id: number,
    data: CreateCustomerDto
):Promise<Customer> => {
    return apiRequest<Customer>(
        `/api/admin/customers/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const deleteCustomer = async (
    id: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/customers/${id}`,
        { method: "DELETE" }
    )
}

export const addCustomerContact = async (
    customerId: number,
    data: CustomerContactCrudDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/customers/${customerId}/customerContacts`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateCustomerContact = async (
    customerId: number,
    customerContactId: number,
    data: CustomerContactCrudDto
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/customers/${customerId}/customerContacts/${customerContactId}`,
        {
            method: "PUT",
            body: data
        }
    )
}

export const deleteCustomerContact = async (
    customerId: number,
    customerContactId: number
):Promise<void> => {
    return apiRequest<void>(
        `/api/admin/customers/${customerId}/customerContacts/${customerContactId}`,
        { method: "DELETE" }
    )
}