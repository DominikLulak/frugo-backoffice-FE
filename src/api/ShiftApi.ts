import type {Shift, ShiftCreateDto} from "../types/referenceData.ts";
import {apiRequest} from "./ApiClient.ts";

export const getShifts = async (): Promise<Shift[]> => {

    return apiRequest<Shift[]>(
        `/api/admin/shifts`
    )
}

export const createShift = async (
    data: ShiftCreateDto
):Promise<Shift> => {
    return apiRequest<Shift>(
        `/api/admin/shifts`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateShift = async (
    id: number,
    data: ShiftCreateDto
):Promise<Shift> => {
    return apiRequest<Shift>(
        `/api/admin/shifts/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}