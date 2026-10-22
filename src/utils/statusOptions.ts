import type {FilterOption} from "../components/common/filters/Filters.tsx";

export function toStatusOptions(
    statuses: readonly string[],
    allLabel = "Vše",
):FilterOption[]{
    return [
        {label: allLabel, value: ""},
        ...statuses.map((status) => ({
            label:status,
            value: status,
        }))
    ]
}