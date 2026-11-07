import type {ProductFilterState} from "./useProductsList.ts";
import type {FilterField} from "../../../components/common/filters/Filters.tsx";
import type {StockStatus} from "./useProductsTable.ts";

type Props = {
    filters: ProductFilterState;
    updateFilters: <K extends keyof ProductFilterState>(
        key: K,
        value: ProductFilterState[K]
    ) => void;
    stockStatus: StockStatus;
    setStockStatus: (value: StockStatus) => void
}

export default function useProductsFilters({
    filters, updateFilters, stockStatus, setStockStatus
}:Props): FilterField[]{
    return [
        {
            name: "category",
            type: "text",
            value: filters.category,
            placeholder: "Kategorie",
            onChange: (value) => updateFilters("category", value)
        },
        {
            name: "productType",
            type: "text",
            value: filters.productType,
            placeholder: "Typ produktu",
            onChange: (value) => updateFilters("productType", value)
        },
        {
            name: "productCode",
            type: "text",
            value: filters.productCode,
            placeholder: "Kod produktu",
            onChange: (value) => updateFilters("productCode", value)
        },
        {
            name: "stockStatus",
            type: "select",
            value: stockStatus,
            options: [
                {label: "Vsechny stavy", value: "ALL"},
                {label: "Dostatek", value: "OK"},
                {label: "Dochazi", value: "LOW"},
                {label: "Objednat", value: "ORDER"}
            ],
            onChange: (value) => setStockStatus(value as StockStatus)
        }
    ]
}