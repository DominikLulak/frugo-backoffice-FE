import {useState} from "react";
import type {StockItem, StockItemDetail} from "../../types/stock.ts";
import {getStockItemDetail} from "../../api/StockApi.ts";

export default function useStockItemModal(){
    const [selectedStockItem, setSelectedStockItem] = useState<StockItemDetail | null>(null)

    const openDetail = async (stockItem: StockItem) => {
        const data = await getStockItemDetail(stockItem.id)
        setSelectedStockItem(data)
    }

    const closeDetail = () => {
        setSelectedStockItem(null)
    }

    return{
        selectedStockItem, openDetail, closeDetail
    }
}