import {useState} from "react";
import type {StockMovement, StockMovementDetail} from "../../../types/event.ts";
import {getStockMovementDetail} from "../../../api/StockMovementApi.ts";

export default function useStockMovementModal(){
    const [selectedStockMovement, setSelectedStockMovement] = useState<StockMovementDetail | null>(null)

    const openDetail = async (stockMovement: StockMovement) => {
        const data = await getStockMovementDetail(stockMovement.id)
        setSelectedStockMovement(data)
    }

    const closeDetail = () => {
        setSelectedStockMovement(null)
    }

    return{
        selectedStockMovement, openDetail, closeDetail
    }
}