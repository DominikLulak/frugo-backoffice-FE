import {API_URL} from "./config.ts";

export const getCustomers = async (
    customerNumber = "",
    name = "",
    email = "",
    phoneNumber = ""
) => {
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
    return await res.json()
}

export const getCustomerDetail = async (customerNumber: string) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/customers/${customerNumber}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.json()
}