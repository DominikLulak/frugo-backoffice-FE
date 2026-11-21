import type {PurchaseOrderReceivingDto, PurchaseOrderReceivingResultDto} from "../types/purchaseOrderReceiving.ts";
import {apiRequest} from "./ApiClient.ts";

export const receivePurchaseOrder = async (
    purchaseOrderId: number,
    data: PurchaseOrderReceivingDto
):Promise<PurchaseOrderReceivingResultDto> => {
    return apiRequest<PurchaseOrderReceivingResultDto>(
        `/api/admin/purchaseOrders/${purchaseOrderId}/receiving`,
        {
            method: "POST",
            body: data
        }
    )
}