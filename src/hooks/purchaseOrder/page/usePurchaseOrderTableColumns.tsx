import type {PurchaseOrder} from "../../../types/purchaseOrder.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";
import DeleteButton from "../../../components/common/buttons/DeleteButton.tsx";
import PdfButton from "../../../components/common/buttons/PdfButton.tsx";

type Props = {
    onDetail: (purchaseOrder: PurchaseOrder) => void;
    onDelete: (purchaseOrder: PurchaseOrder) => void;
    onDownloadPdf: (purchaseOrder: PurchaseOrder) => Promise<void>;
}

export default function usePurchaseOrderTableColumns({onDetail, onDelete, onDownloadPdf}:Props):TableColumn<PurchaseOrder>[]{
    return [
        {
            key: "purchaseOrderNumber",
            header: "Cislo nakupni objednavky",
            render: (purchaseOrder) => purchaseOrder.purchaseOrderNumber
        },
        {
            key: "supplierName",
            header: "Nazev dodavatele",
            render: (purchaseOrder) => purchaseOrder.supplierName
        },
        {
            key: "createdAt",
            header: "Datum vytvoreni",
            render: (purchaseOrder) => purchaseOrder.createdAt.replace("T", " ").substring(0,19)
        },
        {
            key: "employeeName",
            header: "Jmeno zamestnance",
            render: (purchaseOrder) => purchaseOrder.employeeName
        },
        {
            key: "statusCode",
            header: "Stav",
            render: (purchaseOrder) => purchaseOrder.statusCode
        },
        {
            key: "actions",
            header: "Akce",
            render: (purchaseOrder) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(purchaseOrder)}
                    />
                    <PdfButton
                        onClick={() => onDownloadPdf(purchaseOrder)}
                    />
                    {(purchaseOrder.statusCode === "ENTERED" || purchaseOrder.statusCode === "BLOCKED") && (
                        <DeleteButton
                            onClick={() => onDelete(purchaseOrder)}
                        />
                    )}
                </div>
            )
        },
    ]
}