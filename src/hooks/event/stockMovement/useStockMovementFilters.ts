import type {StockMovementFiltersState} from "./useStockMovementList.ts";
import type {FilterField} from "../../../components/common/filters/Filters.tsx";

type Props = {
    filters: StockMovementFiltersState;
    updateFilters: <K extends keyof StockMovementFiltersState>(
        key: K,
        value: StockMovementFiltersState[K]
    ) => void;
}

export default function useStockMovementFilters({filters, updateFilters}:Props):FilterField[]{
    return [
        {
            name: "eventCode",
            type: "text",
            value: filters.eventCode,
            placeholder: "Kod eventu",
            onChange: (value) => updateFilters("eventCode", value)
        },
        {
            name: "etiNumber",
            type: "text",
            value: filters.etiNumber,
            placeholder: "Cislo ETI",
            onChange: (value) => updateFilters("etiNumber", value)
        },
        {
            name: "fromLocation",
            type: "text",
            value: filters.fromLocation,
            placeholder: "Z lokace",
            onChange: (value) => updateFilters("fromLocation", value)
        },
        {
            name: "eventCode",
            type: "text",
            value: filters.eventCode,
            placeholder: "Kod eventu",
            onChange: (value) => updateFilters("eventCode", value)
        },
        {
            name: "toLocation",
            type: "text",
            value: filters.toLocation,
            placeholder: "Na lokaci",
            onChange: (value) => updateFilters("toLocation", value)
        },
        {
            name: "employeeNumber",
            type: "text",
            value: filters.employeeNumber,
            placeholder: "Cislo zamestnance",
            onChange: (value) => updateFilters("employeeNumber", value)
        },
    ]
}