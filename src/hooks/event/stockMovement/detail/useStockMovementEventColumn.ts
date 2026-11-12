import type {TableColumn} from "../../../../components/common/Table.tsx";
import type {StockMovementDetail} from "../../../../types/event.ts";

export default function useStockMovementEventColumn():TableColumn<StockMovementDetail>[]{
    return [
        {
            key: "eventCode",
            header: "Kod udalosti",
            render: (stockMovement) => stockMovement.eventCode
        },
        {
            key: "eventName",
            header: "Nazev udalosti",
            render: (stockMovement) => stockMovement.eventName
        },
        {
            key: "eventDescription",
            header: "Popis udalosti",
            render: (stockMovement) => stockMovement.eventDescription
        },
    ]
}