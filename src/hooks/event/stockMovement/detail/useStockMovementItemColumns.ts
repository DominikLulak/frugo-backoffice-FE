import type {TableColumn} from "../../../../components/common/Table.tsx";
import type {StockMovementDetail} from "../../../../types/event.ts";

export default function useStockMovementItemColumns():TableColumn<StockMovementDetail>[]{
    return [
        {
            key: "etiNumber",
            header: "Cislo ETI",
            render: (stockMovement) => stockMovement.etiNumber
        },
        {
            key: "newEtiNumber",
            header: "Cislo noveho ETI",
            render: (stockMovement) => stockMovement.newEtiNumber ?? "-"
        },
        {
            key: "quantity",
            header: "Pocet",
            render: (stockMovement) => stockMovement.quantity
        },
    ]
}