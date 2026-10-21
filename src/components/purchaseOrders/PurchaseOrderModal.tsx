import type {PurchaseOrderDetail, PurchaseOrderItem} from "../../types/purchaseOrder.ts";
import "../modal.css"
import {useState} from "react";
import PurchaseOrderItemEditModal from "./purchaseOrderItemEdit/PurchaseOrderItemEditModal.tsx";
import PurchaseOrderItemAddModal from "./purchaseOrderItemEdit/PurchaseOrderItemAddModal.tsx";
import ConfirmDeleteModal from "../common/modal/ConfirmDeleteModal.tsx";
import PurchaseOrderEditModal from "./purchaseOrderEdit/PurchaseOrderEditModal.tsx";
import PurchaseOrderStatusModal from "./purchaseOrderEdit/PurchaseOrderStatusModal.tsx";
import usePurchaseOrderDeleteItem from "../../hooks/purchaseOrder/modal/items/usePurchaseOrderDeleteItem.ts";
import usePurchaseOrderModalTableColumns from "../../hooks/purchaseOrder/modal/usePurchaseOrderModalTableColumns.tsx";
import BaseModal from "../common/modal/BaseModal.tsx";
import usePurchaseOrderDetailSection from "../../hooks/purchaseOrder/modal/usePurchaseOrderDetailSection.ts";
import KeyValueTable from "../common/KeyValueTable.tsx";
import Table from "../common/Table.tsx";

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

    const [showEditModal, setShowEditModal] = useState(false)
    const [showStatusModal, setShowStatusModal] = useState(false)

    const {
        itemToDelete, deleting, deleteError,
        openDeleteModal, closeDeleteModal, handleDelete
    } = usePurchaseOrderDeleteItem(purchasedOrderId, onSaved)

    const sections = usePurchaseOrderDetailSection(purchaseOrder)

    const itemColumns = usePurchaseOrderModalTableColumns({
        purchaseOrderStatus: purchaseOrder.statusCode,
        onEdit: setSelectedItem,
        onDelete: openDeleteModal
    })

    const canEditOrder =
        purchaseOrder.statusCode === "ENTERED" ||
        purchaseOrder.statusCode === "BLOCKED"

    const canChangeStatus =
        purchaseOrder.statusCode === "ENTERED" ||
        purchaseOrder.statusCode === "RELEASED" ||
        purchaseOrder.statusCode === "BLOCKED"

    return(

        <>
            <BaseModal
                title={`Nakupni objednavka ${purchaseOrder.purchaseOrderNumber}`}
                onClose={onClose}
            >
                {sections.map((section) => (
                    <section key={section.title} className="mb-4">
                        <h6>{section.title}</h6>
                        <KeyValueTable rows={section.rows}/>

                        {section.title === "Udaje nakupni objednavky" && (
                            <div className="d-flex gap-2 mt-3">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => setShowEditModal(true)}
                                    disabled={!canEditOrder}
                                >
                                    Upravit dodavatele
                                </button>

                                {canChangeStatus && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => setShowStatusModal(true)}
                                    >
                                        Zmenit stav
                                    </button>
                                )}
                            </div>
                        )}
                    </section>
                ))}

                <section>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Polozky objednavky</h6>

                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => setShowAddItemModal(true)}
                            disabled={!canEditOrder}
                        >
                            Pridat polozku
                        </button>
                    </div>

                    <Table<PurchaseOrderItem>
                        columns={itemColumns}
                        data={purchaseOrder.items}
                        getRowKey={(item) => item.id}
                    />

                    {purchaseOrder.items.length === 0 && (
                        <p className="text-muted mt-2">
                            Objednavka zatim neobsahuje zadne polozky
                        </p>
                    )}
                </section>

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
                        show={true}
                        title="Odstranit polozku"
                        description="Opravdu chcete odstranit polozku?"
                        itemName={itemToDelete?.productName ?? ""}
                        loading={deleting}
                        error={deleteError}
                        onClose={closeDeleteModal}
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
            </BaseModal>
        </>
    )
}