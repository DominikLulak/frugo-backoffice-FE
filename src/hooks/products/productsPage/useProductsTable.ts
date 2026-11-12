import type {Product} from "../../../types/product.ts";
import {useMemo, useState} from "react";

export type StockStatus = "ALL" | "OK" | "LOW" | "ORDER"

const getStockStatus = (product: Product): StockStatus => {
    if(product.availableStock <= product.minimumStock){
        return "ORDER"
    }
    if(product.availableStock <= product.reorderPoint){
        return "LOW"
    }
    return "OK"
}

export default function useProductsTable(products: Product[]){
    const [stockStatus, setStockStatus] = useState<StockStatus>("ALL")

    const getRowClass = (product: Product): string => {
        const status = getStockStatus(product)

        if(status === "ORDER") return "table-danger"
        if(status === "LOW") return "table-warning"

        return ""
    }

    const getStockStatusLabel = (product: Product): string => {
        const status = getStockStatus(product)

        if(status === "ORDER") return "🔴 Objednat"
        if(status === "LOW") return "🟠 Dochazi"

        return "🟢 Dostatek"
    }

    const filteredProducts = useMemo(() => {
        if(stockStatus === "ALL"){
            return products
        }

        return products.filter(
            product => getStockStatus(product) === stockStatus
        )
    }, [products, stockStatus])

    return{
        stockStatus, setStockStatus, filteredProducts, getStockStatus,
        getRowClass, getStockStatusLabel
    }
}