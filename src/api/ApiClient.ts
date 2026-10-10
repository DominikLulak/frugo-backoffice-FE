import {API_URL} from "./config.ts";

type ApiRequestOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: unknown;
}

export async function apiRequest<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
):Promise<T> {
    const token = localStorage.getItem("token")

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`
    }

    const requestOptions: RequestInit = {
        method: options.method ?? "GET",
        headers
    }

    if(options.body !== undefined){
        headers ["Content-Type"] = "application/json"
        requestOptions.body = JSON.stringify(options.body)
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        requestOptions
    )

    if(!response.ok){
        throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
        )
    }

    if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
    ) {
        return undefined as T;
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        return undefined as T;
    }

    return await response.json() as T
}