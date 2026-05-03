import {API_URL} from "./config.ts";

export const getStockItems = async (
    category = "",
    name = "",
    variant = ""
) =>{

    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if(category) params.append("category", category)
    if(name) params.append("name", name)
    if(variant) params.append("variant", variant)

    const response = await fetch(
        `${API_URL}/api/admin/products/stock?${params.toString()}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return await response.json()
}