import type {TableColumn} from "../../../components/common/Table.tsx";
import type {PurchaseOrderStatusHistory} from "../../../types/event.ts";

export default function usePOStatusHistoryColumns():TableColumn<PurchaseOrderStatusHistory>[]{
    return [
        {
            key: "purchaseOrderNumber",
            header: "Cislo nakupni objednavky",
            render: (statusHistory) => statusHistory.purchaseOrderNumber
        },
        {
            key: "oldStatusCode",
            header: "Puvodni status",
            render: (statusHistory) => statusHistory.oldStatusCode ?? "-"
        },
        {
            key: "newStatusCode",
            header: "Novy status",
            render: (statusHistory) => statusHistory.newStatusCode
        },
        {
            key: "changedAt",
            header: "Datum zmeny",
            render: (statusHistory) => statusHistory.changedAt.replace("T", " ").substring(0,19)
        },
        {
            key: "employeeName",
            header: "Jmeno zamestnance",
            render: (statusHistory) => statusHistory.employeeName ?? "SYSTEM"
        },
        {
            key: "note",
            header: "Poznamka",
            render: (statusHistory) => statusHistory.note
        },
    ]
}