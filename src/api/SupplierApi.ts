import type {Supplier} from "../types/supplier.ts";
import {API_URL} from "./config.ts";

export interface SupplierCreateDto{
    name: string;
    internalCode: string;
}

export interface SupplierUpdateDto{
    name: string;
    internalCode: string;
}

export const getSuppliers = async (
    name: string = "",
    internalCode: string = "",
    active: boolean | null = null
):Promise<Supplier[]> => {
    const token = localStorage.getItem("token")

    const params = new URLSearchParams()

    if(name) params.append("name", name)
    if(internalCode) params.append("internalCode", internalCode)
    if(active !== null) params.append("isActive", String(active))

    const res = await fetch(`${API_URL}/api/admin/suppliers?${params.toString()}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch Suppliers!")
    }
    return await res.json() as Promise<Supplier[]>
}

export const createSupplier = async (
    data: SupplierCreateDto
):Promise<Supplier> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/suppliers`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if(!res.ok){
        throw new Error("Failed to create supplier!")
    }
    return await res.json() as Promise<Supplier>
}

export const updateSupplier = async (
    id: number,
    data: SupplierUpdateDto
):Promise<Supplier> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/suppliers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if(!res.ok){
        throw new Error("Failed to update supplier!")
    }
    return await res.json() as Promise<Supplier>
}

export const setSupplierActive = async (
    id: number,
    active: boolean
):Promise<Supplier> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/suppliers/${id}/active?active=${active}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to change supplier active status!")
    }
    return await res.json() as Promise<Supplier>
}

export const deleteSupplier = async (
    id: number
):Promise<void> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/suppliers/${id}`, {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to delete supplier!")
    }
}