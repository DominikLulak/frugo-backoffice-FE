import type {OrderFilterState} from "./useOrderList.ts";
import type {FilterField} from "../../components/common/filters/Filters.tsx";
import {toStatusOptions} from "../../utils/statusOptions.ts";
import {STATUSES} from "../../constants/statuses.ts";

type Props = {
    filters: OrderFilterState
    updateFilters: <K extends keyof OrderFilterState>(
        key: K,
        value: OrderFilterState[K]
    ) => void
}

export default function useOrderFilters({
    filters, updateFilters
}:Props):FilterField[]{
    return [
        {
            name: "orderNumber",
            type: "text",
            value: filters.orderNumber,
            placeholder: "Cislo objednavky",
            onChange: (value) => updateFilters("orderNumber", value)
        },
        {
            name: "customerName",
            type: "text",
            value: filters.customerName,
            placeholder: "Nazev zakaznika",
            onChange: (value) => updateFilters("customerName", value)
        },
        {
            name: "statusCode",
            type: "select",
            value: filters.statusCode,
            options: toStatusOptions(STATUSES),
            onChange: (value) => updateFilters("statusCode", value)
        }
    ]
}