import type {KeyValueRow} from "../../../components/common/KeyValueTable.tsx";
import type {OrderDetail} from "../../../types/order.ts";

export type OrderDetailSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useOrderDetailSection(
    order: OrderDetail
):OrderDetailSection[]{
    return [
        {
            title: "Udaje objednavky",
            rows:[
                {label: "Cislo objednavky", value: order.orderNumber},
                {label: "Nazev zakaznik", value: order.customerName},
                {label: "Datum vytvoreni", value: order.createdAt.replace("T", " ").substring(0,19)},
                {label: "Datum vytvoreni", value: order.createdAt},
                {label: "Stav", value: order.statusCode},
            ]
        }
    ]
}