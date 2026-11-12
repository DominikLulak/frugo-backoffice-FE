import type {StockMovement} from "../../../types/event.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (stockMovement: StockMovement) => void;
}

export default function useStockMovementColumns({onDetail}:Props):TableColumn<StockMovement>[]{
    return [
        {
            key: "eventCode",
            header: "Kod eventu",
            render: (stockMovement) => stockMovement.eventCode
        },
        {
            key: "etiNumber",
            header: "Cislo ETI",
            render: (stockMovement) => stockMovement.etiNumber
        },
        {
            key: "createdAt",
            header: "Vytvoreno",
            render: (stockMovement) => stockMovement.createdAt
        },
        {
            key: "quantity",
            header: "Pocet",
            render: (stockMovement) => stockMovement.quantity
        },
        {
            key: "fromLocation",
            header: "Z lokace",
            render: (stockMovement) => stockMovement.fromLocation ?? "-"
        },
        {
            key: "toLocation",
            header: "Na lokaci",
            render: (stockMovement) => stockMovement.toLocation ?? "-"
        },
        {
            key: "employeeNumber",
            header: "Cislo zamestnance",
            render: (stockMovement) => stockMovement.employeeNumber
        },
        {
            key: "actions",
            header: "Akce",
            render: (stockMovement) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(stockMovement)}
                    />
                </div>
            )
        },
    ]
}