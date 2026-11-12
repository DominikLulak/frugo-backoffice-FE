import type {StockItemsFiltersState} from "./useStockItemsList.ts";
import type {FilterField} from "../../components/common/filters/Filters.tsx";

type Props = {
    filters: StockItemsFiltersState;
    updateFilters: <K extends keyof StockItemsFiltersState>(
        key: K,
        value: StockItemsFiltersState[K]
    ) => void
}

export default function useStockItemFilters({
    filters, updateFilters
}:Props):FilterField[]{
    return[
        {
            name: "productCode",
            type: "text",
            value: filters.productCode,
            placeholder: "Kod produktu",
            onChange: (value) => updateFilters("productCode", value)
        },
        {
            name: "category",
            type: "text",
            value: filters.category,
            placeholder: "Kategorie",
            onChange: (value) => updateFilters("category", value)
        },
        {
            name: "name",
            type: "text",
            value: filters.name,
            placeholder: "Nazev",
            onChange: (value) => updateFilters("name", value)
        },
        {
            name: "productType",
            type: "text",
            value: filters.productType,
            placeholder: "Typ produktu",
            onChange: (value) => updateFilters("productType", value)
        },
        {
            name: "etiNumber",
            type: "text",
            value: filters.etiNumber,
            placeholder: "ETI Cislo",
            onChange: (value) => updateFilters("etiNumber", value)
        },
        {
            name: "warehouseCode",
            type: "text",
            value: filters.warehouseCode,
            placeholder: "Kod skladu",
            onChange: (value) => updateFilters("warehouseCode", value)
        },
    ]
}