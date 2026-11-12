import type {ShipmentFiltersState} from "./useShipmentList.ts";
import type {FilterField} from "../../components/common/filters/Filters.tsx";

type Props = {
    filters: ShipmentFiltersState;
    updateFilters: <K extends keyof ShipmentFiltersState>(
        key: K,
        value: ShipmentFiltersState[K]
    ) => void
}

export default function useShipmentFilters({
    filters, updateFilters
}:Props):FilterField[]{
    return [
        {
            name: "shipmentNumber",
            type: "text",
            value: filters.shipmentNumber,
            placeholder: "Cislo zasilky",
            onChange: (value) => updateFilters("shipmentNumber", value)
        },
        {
            name: "orderNumber",
            type: "text",
            value: filters.orderNumber,
            placeholder: "Cislo objednavky",
            onChange: (value) => updateFilters("orderNumber", value)
        },
        {
            name: "statusCode",
            type: "select",
            value: filters.statusCode === null ? "" : String(filters.statusCode),
            placeholder: "Vse",
            options: [
                {label: "ENTERED", value: "ENTERED"},
                {label: "RELEASED", value: "RELEASED"},
                {label: "BLOCKED", value: "BLOCKED"},
                {label: "COMPLETED", value: "COMPLETED"},
                {label: "CANCELLED", value: "CANCELLED"},
                {label: "FINISHED", value: "FINISHED"},
            ],
            onChange: (value) => updateFilters("statusCode", value)
        }
    ]
}