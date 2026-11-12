import type {KeyValueRow} from "../../../components/common/KeyValueTable.tsx";
import type {PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";

export type PurchaseOrderDetailSection = {
    title: string;
    rows: KeyValueRow[];
}

export default function usePurchaseOrderDetailSection(
    purchaseOrder: PurchaseOrderDetail
):PurchaseOrderDetailSection[]{
    return [
        {
            title: "Udaje nakupni objednavky",
            rows:[
                {label: "Cislo objednavky", value: purchaseOrder.purchaseOrderNumber},
                {label: "Nazev dodavatele", value: purchaseOrder.supplierName},
                {label: "Interni kod dodavatele", value: purchaseOrder.supplierInternalCode},
                {label: "Vytvoreno", value: purchaseOrder.createdAt.replace("T", " ").substring(0,19)},
                {label: "Jmeno zamestnance", value: purchaseOrder.employeeName},
                {label: "Stav", value: purchaseOrder.statusCode},
            ]
        }
    ]
}