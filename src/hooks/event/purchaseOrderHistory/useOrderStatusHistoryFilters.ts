import type {OrderStatusHistoryList} from "./useOrderStatusHistoryList.ts";
import type {FilterField} from "../../../components/common/filters/Filters.tsx";

type Props = {
    filters: OrderStatusHistoryList;
    updateFilters: <K extends keyof OrderStatusHistoryList>(
        key: K,
        value: OrderStatusHistoryList[K]
    ) => void;
}

export default function useOrderStatusHistoryFilters({filters, updateFilters}:Props):FilterField[]{
    return [
        {
            name: "orderNumber",
            type: "text",
            value: filters.orderNumber,
            placeholder: "Cislo objednavky",
            onChange: (value) => updateFilters("orderNumber", value)
        },
        {
            name: "employeeName",
            type: "text",
            value: filters.employeeName,
            placeholder: "Jmeno zamestnance",
            onChange: (value) => updateFilters("employeeName", value)
        },
    ]
}