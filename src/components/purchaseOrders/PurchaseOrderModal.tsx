import type {PurchaseOrderDetail, PurchaseOrderItem} from "../../types/purchaseOrder.ts";
import "../modal.css"
import {useState} from "react";
import PurchaseOrderItemEditModal from "./PurchaseOrderItemEditModal.tsx";

type Props = {
    purchasedOrderId: number;
    purchaseOrder: PurchaseOrderDetail;
    onClose: () => void;
    onSaved: () => void;
}

export default function PurchaseOrderModal({
    purchasedOrderId,
    purchaseOrder,
    onClose,
    onSaved
}:Props){
    const [selectedItem, setSelectedItem] = useState<PurchaseOrderItem | null>(null)

    return(
        <div
            className="modal-backdrop-custom"
            onClick={onClose}
        >
            <div
                className="modal-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">

                    <div className="modal-header">
                        <h5>Nakupni objednavka {purchaseOrder.purchaseOrderNumber}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Udaje nakupni objednavky</h6>

                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Nazev dodavatele</th>
                                    <td>{purchaseOrder.supplierName}</td>
                                </tr>
                                <tr>
                                    <th>Interni kod dodavatele</th>
                                    <td>{purchaseOrder.supplierInternalCode}</td>
                                </tr>
                                <tr>
                                    <th>Vytvoreno</th>
                                    <td>{purchaseOrder.createdAt.replace("T", " ").substring(0,19)}</td>
                                </tr>
                                <tr>
                                    <th>Jmeno zamestnance</th>
                                    <td>{purchaseOrder.employeeName}</td>
                                </tr>
                                <tr>
                                    <th>Stav</th>
                                    <td>{purchaseOrder.statusCode}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Polozky nakupni objednavky</h6>

                        {purchaseOrder.items.length === 0 ? (
                            <p>Zadne polozky</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Kategorie</th>
                                    <th>Typ</th>
                                    <th>Nazev</th>
                                    <th>Zeme puvodu</th>
                                    <th>Mnozstvi</th>
                                    <th>Prijate mnozstvi</th>
                                    <th>Stav</th>
                                    <th>Akce</th>
                                </tr>
                                </thead>

                                <tbody>
                                {purchaseOrder.items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.categoryCode}</td>
                                        <td>{item.productType}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.countryCode}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.receivedQuantity}</td>
                                        <td>{item.statusCode}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setSelectedItem(item)}
                                                disabled={
                                                    purchaseOrder.statusCode === "COMPLETED" ||
                                                    purchaseOrder.statusCode === "CANCELED"
                                                }
                                            >
                                                Upravit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {selectedItem && (
                <PurchaseOrderItemEditModal
                    show={true}
                    purchasedOrderId={purchasedOrderId}
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onSaved={() => {setSelectedItem(null); onSaved();}}
                />
            )}
        </div>
    )
}