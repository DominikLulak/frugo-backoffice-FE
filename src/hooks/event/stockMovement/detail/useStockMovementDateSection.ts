import type {KeyValueRow} from "../../../../components/common/KeyValueTable.tsx";
import type {StockMovementDetail} from "../../../../types/event.ts";

export type StockMovementDateSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useStockMovementDateSection(
    stockMovement: StockMovementDetail
):StockMovementDateSection[]{
    return [
        {
            title: "Datum",
            rows: [
                {label: "Datum vytvoreni", value: stockMovement.createdAt}
            ]
        }
    ]
}