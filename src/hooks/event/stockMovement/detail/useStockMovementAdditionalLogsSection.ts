import type {KeyValueRow} from "../../../../components/common/KeyValueTable.tsx";
import type {StockMovementDetail} from "../../../../types/event.ts";

export type StockMovementAdditionalLogsSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useStockMovementAdditionalLogsSection(
    stockMovement: StockMovementDetail
):StockMovementAdditionalLogsSection[]{
    return [
        {
            title: "Souvisejici zaznamy",
            rows: [
                {label: "Cislo zamestnance", value: stockMovement.employeeNumber},
                {label: "Jmeno zamestnance", value: stockMovement.employeeName},
                {label: "Cislo palety", value: stockMovement.palletNumber ?? "-"},
                {label: "Cislo objednavky", value: stockMovement.orderNumber ?? "-"},
                {label: "Cislo zasilky", value: stockMovement.shipmentNumber ?? "-"},
                {label: "Cislo nakupni objednavky", value: stockMovement.purchaseOrderNumber ?? "-"},
            ]
        }
    ]
}