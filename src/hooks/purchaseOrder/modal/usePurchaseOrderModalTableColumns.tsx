import type {PurchaseOrderItem} from "../../../types/purchaseOrder.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";

type Props = {
    purchaseOrderStatus: string;
    onEdit: (item: PurchaseOrderItem) => void;
    onDelete: (item: PurchaseOrderItem) => void;
}

export default function usePurchaseOrderModalTableColumns({
    purchaseOrderStatus, onEdit, onDelete
}:Props):TableColumn<PurchaseOrderItem>[]{
    const isReadOnly =
        purchaseOrderStatus === "ENTERED" ||
        purchaseOrderStatus === "BLOCKED";

    return [
        {
            key: "categoryCode",
            header: "Kategorie",
            render: (item) => item.categoryCode
        },
        {
            key: "productType",
            header: "Druh",
            render: (item) => item.productType
        },
        {
            key: "productName",
            header: "Produkt",
            render: (item) => item.productName
        },
        {
            key: "countryCode",
            header: "Zeme puvodu",
            render: (item) => item.countryCode
        },
        {
            key: "quantity",
            header: "Objednano",
            render: (item) => item.quantity
        },
        {
            key: "receivedQuantity",
            header: "Prijato",
            render: (item) => item.receivedQuantity
        },
        {
            key: "statusCode",
            header: "Stav",
            render: (item) => item.statusCode
        },
        {
            key: "actions",
            header: "Akce",
            render: (item) => (
                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(item)}
                        disabled={!isReadOnly}
                    >
                        Upravit
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(item)}
                        disabled={!isReadOnly || item.receivedQuantity > 0}
                    >
                        Odstranit
                    </button>
                </div>
            )
        },
    ]
}