import type {Shipment} from "../../types/shipment.ts";
import type {TableColumn} from "../../components/common/Table.tsx";
import DetailButton from "../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (shipment: Shipment) => void;
}

export default function useShipmentColumns({onDetail}:Props):TableColumn<Shipment>[]{
    return [
        {
            key: "shipmentNumber",
            header: "Cislo zasilky",
            render: (shipment) => shipment.shipmentNumber
        },
        {
            key: "orderNumber",
            header: "Cislo objednavky",
            render: (shipment) => shipment.orderNumber
        },
        {
            key: "statusCode",
            header: "Cislo zasilky",
            render: (shipment) => shipment.statusCode
        },
        {
            key: "actions",
            header: "Akce",
            render: (shipment) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(shipment)}
                    />
                </div>
            )
        },
    ]
}