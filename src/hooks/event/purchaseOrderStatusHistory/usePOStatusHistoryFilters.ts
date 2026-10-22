import type {POStatusHistoryList} from "./usePOStatusHistoryList.ts";
import type {FilterField} from "../../../components/common/filters/Filters.tsx";

type Props = {
    filters: POStatusHistoryList;
    updateFilters: <K extends keyof POStatusHistoryList>(
        key: K,
        value: POStatusHistoryList[K]
    ) => void;
}

export default function ({filters, updateFilters}:Props):FilterField[]{
    return [
        {
            name: "purchaseOrderNumber",
            type: "text",
            value: filters.purchaseOrderNumber,
            placeholder: "Cislo objednavky",
            onChange: (value) => updateFilters("purchaseOrderNumber", value)
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