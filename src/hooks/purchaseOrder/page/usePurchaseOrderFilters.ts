import type {PurchaseOrderFiltersState} from "./usePurchaseOrderList.ts";
import type {FilterField} from "../../../components/common/filters/Filters.tsx";
import {toStatusOptions} from "../../../utils/statusOptions.ts";
import {STATUSES} from "../../../constants/statuses.ts";

type Props = {
    filters: PurchaseOrderFiltersState;
    updateFilters: <K extends keyof PurchaseOrderFiltersState>(
        key: K,
        value: PurchaseOrderFiltersState[K]
    ) => void;
}

export default function usePurchaseOrderFilters({
    filters,
    updateFilters
}:Props):FilterField[]{
    return [
        {
            name: "purchaseOrderNumber",
            type: "text",
            value: filters.purchaseOrderNumber,
            placeholder: "Cislo nakupni objednavky",
            onChange: (value) => updateFilters("purchaseOrderNumber", value)
        },
        {
            name: "supplierName",
            type: "text",
            value: filters.supplierName,
            placeholder: "Nazev dodavatele",
            onChange: (value) => updateFilters("supplierName", value)
        },
        {
            name: "employeeName",
            type: "text",
            value: filters.employeeName,
            placeholder: "Jmeno zamestnance",
            onChange: (value) => updateFilters("employeeName", value)
        },
        {
            name: "statusCode",
            type: "select",
            value: filters.statusCode,
            options: toStatusOptions(STATUSES),
            onChange: (value) => updateFilters("statusCode", value)
        },
    ]
}