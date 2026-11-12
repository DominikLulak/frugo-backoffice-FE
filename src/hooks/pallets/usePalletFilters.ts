import type {PalletsFiltersState} from "./usePalletsList.ts";
import type {FilterField} from "../../components/common/filters/Filters.tsx";

type Props = {
    filters: PalletsFiltersState;
    updateFilters: <K extends keyof PalletsFiltersState>(
        key: K,
        value: PalletsFiltersState[K]
    ) => void;
}

export default function usePalletFilters({
    filters, updateFilters
}:Props):FilterField[]{
    return [
        {
            name: "palletNumber",
            type: "text",
            value: filters.palletNumber,
            placeholder: "Cislo palety",
            onChange: (value) => updateFilters("palletNumber", value)
        },
        {
            name: "locationCode",
            type: "text",
            value: filters.locationCode,
            placeholder: "Kod lokace",
            onChange: (value) => updateFilters("locationCode", value)
        },
        {
            name: "closed",
            type: "select",
            value: filters.closed === null ? "" : String(filters.closed),
            placeholder: "Vse",
            options: [
                {label: "Uzavrena", value: "true"},
                {label: "Neuzavrena", value: "false"}
            ],
            onChange: (value) => updateFilters("closed", value === "" ? null : value === "true")
        },
    ]
}