import type {Status} from "../types/referenceData.ts";
import {apiRequest} from "./ApiClient.ts";

export const getStatuses = async (): Promise<Status[]> => {

    return apiRequest<Status[]>(
        `/api/admin/statuses`
    )
}