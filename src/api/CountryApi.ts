import type {Country, CountryCreateDto} from "../types/referenceData.ts";
import {apiRequest} from "./ApiClient.ts";

export const getCountries = async (): Promise<Country[]> => {

    return apiRequest<Country[]>(
        `/api/admin/countries`
    )
}

export const createCountry = async (
    data: CountryCreateDto
):Promise<Country> => {
    return apiRequest<Country>(
        `/api/admin/countries`,
        {
            method: "POST",
            body: data
        }
    )
}

export const updateCountry = async (
    id: number,
    data: CountryCreateDto
):Promise<Country> => {
    return apiRequest<Country>(
        `/api/admin/countries/${id}`,
        {
            method: "PUT",
            body: data
        }
    )
}