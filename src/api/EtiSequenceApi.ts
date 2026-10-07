import type {EtiSequence} from "../types/etiSequence.ts";
import {API_URL} from "./config.ts";

export const getEtiSequences = async ():Promise<EtiSequence[]> => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/api/admin/etiSeq`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
        throw new Error("Failed to fetch eti sequences!")
    }

    return await res.json() as Promise<EtiSequence[]>
}