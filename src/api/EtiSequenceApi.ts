import type {EtiSequence} from "../types/etiSequence.ts";
import {apiRequest} from "./ApiClient.ts";

export const getEtiSequences = async ():Promise<EtiSequence[]> => {

    return apiRequest<EtiSequence[]>(
        `/api/admin/etiSeq`
    )
}