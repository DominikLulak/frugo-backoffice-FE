import type {Pallet, PalletDetail} from "../types/pallet.ts";
import {apiRequest} from "./ApiClient.ts";

export const getPallets = async (
    palletNumber: string = "",
    locationCode: string = "",
    closed: boolean | null = null
):Promise<Pallet[]> => {
    const params = new URLSearchParams()

    if(palletNumber) params.append("etiNumber", palletNumber)
    if(locationCode) params.append("locationCode", locationCode)
    if(closed !== null) params.append("isClosed", String(closed))

    const query = params.toString()
    const endpoint = `/api/admin/pallets${query ? `?${query}` : ""}`

    return apiRequest<Pallet[]>(endpoint)
}

export const getPalletDetail = async (
    palletId: number
):Promise<PalletDetail> => {
    return apiRequest<PalletDetail>(
        `/api/admin/pallets/${palletId}/items`
    )
}