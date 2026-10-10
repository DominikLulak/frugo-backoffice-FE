import type {PurchaseOrderDetail, PurchaseOrderItem} from "../../types/purchaseOrder.ts";
import "../modal.css"
import {useState} from "react";
import PurchaseOrderItemEditModal from "./PurchaseOrderItemEditModal.tsx";
import PurchaseOrderItemAddModal from "./PurchaseOrderItemAddModal.tsx";
import ConfirmDeleteModal from "../common/modal/ConfirmDeleteModal.tsx";
import {deletePurchaseOrderItem} from "../../api/PurchaseOrderApi.ts";
import PurchaseOrderEditModal from "./PurchaseOrderEditModal.tsx";
import PurchaseOrderStatusModal from "./PurchaseOrderStatusModal.tsx";

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
    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const [itemToDelete, setItemToDelete] = useState<PurchaseOrderItem | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const [showEditModal, setShowEditModal] = useState(false)
    const [showStatusModal, setShowStatusModal] = useState(false)

    const handleDelete = async () => {
        if(!itemToDelete){
            return
        }

        try{
            setDeleting(true)
            setDeleteError("")

            await deletePurchaseOrderItem(
                purchasedOrderId,
                itemToDelete.id
            )

            setItemToDelete(null)
            onSaved()
        }catch {
            setDeleteError("Nepodarilo se odstranit polozku")
        } finally {
            setDeleting(false)
        }
    }

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
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-warning"
                                            onClick={() => setShowEditModal(true)}
                                            disabled={
                                                purchaseOrder.statusCode !== "ENTERED" &&
                                                purchaseOrder.statusCode !== "BLOCKED"
                                            }
                                        >
                                            Upravit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Interni kod dodavatele</th>
                                    <td>{purchaseOrder.supplierInternalCode}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Vytvoreno</th>
                                    <td>{purchaseOrder.createdAt.replace("T", " ").substring(0,19)}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Jmeno zamestnance</th>
                                    <td>{purchaseOrder.employeeName}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Stav</th>
                                    <td>{purchaseOrder.statusCode}</td>
                                    <td>
                                        {(purchaseOrder.statusCode === "ENTERED" || purchaseOrder.statusCode === "BLOCKED") && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-warning"
                                                onClick={() => setShowStatusModal(true)}
                                            >
                                                Zmenit stav
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Polozky nakupni objednavky</h6>
                        <button
                            type="button"
                            className="btn btn-success btn-sm mb-3"
                            onClick={() => setShowAddItemModal(true)}
                            disabled={
                            purchaseOrder.statusCode === "COMPLETED" ||
                            purchaseOrder.statusCode === "CANCELED"
                            }
                        >
                            Pridat polozku
                        </button>

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

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={() => {
                                                    setDeleteError("")
                                                    setItemToDelete(item)
                                                }}
                                                disabled={
                                                    purchaseOrder.statusCode === "COMPLETED" ||
                                                    purchaseOrder.statusCode === "CANCELED" ||
                                                    item.receivedQuantity > 0
                                                }
                                            >
                                                Odstranit
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

            {showAddItemModal && (
                <PurchaseOrderItemAddModal
                    show={true}
                    purchaseOrderId={purchasedOrderId}
                    onClose={() => setShowAddItemModal(false)}
                    onSaved={() => {
                        setShowAddItemModal(false)
                        onSaved()
                    }}
                />
            )}

            {itemToDelete && (
                <ConfirmDeleteModal
                    show={itemToDelete !== null}
                    title="Odstranit polozku"
                    description="Opravdu chcete odstranit polozku?"
                    itemName={itemToDelete?.productName ?? ""}
                    loading={deleting}
                    error={deleteError}
                    onClose={() => setItemToDelete(null)}
                    onConfirm={handleDelete}
                />
            )}

            {showEditModal && (
                <PurchaseOrderEditModal
                    show={true}
                    purchaseOrderId={purchasedOrderId}
                    purchaseOrder={purchaseOrder}
                    onClose={() => setShowEditModal(false)}
                    onSaved={() => {
                        setShowEditModal(false);
                        onSaved();
                    }}
                />
            )}

            {showStatusModal && (
                <PurchaseOrderStatusModal
                    purchaseOrderId={purchasedOrderId}
                    purchaseOrder={purchaseOrder}
                    onClose={() => setShowStatusModal(false)}
                    onSaved={onSaved}
                />
            )}
        </div>
    )
}