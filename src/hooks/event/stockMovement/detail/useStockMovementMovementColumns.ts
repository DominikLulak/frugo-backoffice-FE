import type {TableColumn} from "../../../../components/common/Table.tsx";
import type {StockMovementDetail} from "../../../../types/event.ts";

export default function useStockMovementMovementColumns():TableColumn<StockMovementDetail>[]{
    return [
        {
            key: "fromLocation",
            header: "Z lokace",
            render: (stockMovement) => stockMovement.fromLocation ?? "-"
        },
        {
            key: "toLocation",
            header: "Na lokaci",
            render: (stockMovement) => stockMovement.toLocation ?? "-"
        }
    ]
}