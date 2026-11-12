import type {Order} from "../../types/order.ts";
import type {TableColumn} from "../../components/common/Table.tsx";
import DetailButton from "../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (order: Order) => void;
}

export default function useOrderTableColumns({onDetail}:Props):TableColumn<Order>[]{
    return [
        {
            key: "orderNumber",
            header: "Cislo objednavky",
            render: (order) => order.orderNumber
        },
        {
            key: "customerName",
            header: "Nazev zakaznika",
            render: (order) => order.customerName
        },
        {
            key: "createdAt",
            header: "Datum vytvorerni",
            render: (order) => order.createdAt.replace("T", " ").substring(0,19)
        },
        {
            key: "statusCode",
            header: "Stav",
            render: (order) => order.statusCode
        },
        {
            key: "actions",
            header: "Akce",
            render: (order) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(order)}
                    />
                </div>
            )
        }
    ]
}