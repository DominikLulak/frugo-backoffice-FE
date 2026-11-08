import type {KeyValueRow} from "../../../components/common/KeyValueTable.tsx";
import type {ShipmentDetail} from "../../../types/shipment.ts";

export type ShipmentDetailSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useShipmentSection(
    shipment: ShipmentDetail
):ShipmentDetailSection[]{
    return [
        {
            title: "Udaje zasilky",
            rows: [
                {label: "Cislo objednavky", value: shipment.orderNumber},
                {label: "Stav zasilky", value: shipment.statusCode}
            ]
        }
    ]
}