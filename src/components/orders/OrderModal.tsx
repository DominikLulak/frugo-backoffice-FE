import "../modal.css"
import type {OrderDetail} from "../../types/order.ts";
import useOrderModalTableColumns, {type OrderProductRow, useOrderProducts} from "../../hooks/orders/modal/useOrderModalTableColumns.tsx";
import {useState} from "react";
import useOrderDetailSection from "../../hooks/orders/modal/useOrderDetailSection.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import KeyValueTable from "../common/KeyValueTable.tsx";
import Table from "../common/Table.tsx";
import OrderItemAddModal from "./orderItems/OrderItemAddModal.tsx";
import OrderItemEditModal from "./orderItems/OrderItemEditModal.tsx";
import ConfirmDeleteModal from "../common/modal/ConfirmDeleteModal.tsx";
import useOrderDeleteItem from "../../hooks/orders/modal/items/useOrderDeleteItem.ts";
import OrderEditModal from "./OrderEditModal.tsx";
import OrderStatusModal from "./OrderStatusModal.tsx";

type Props = {
    order: OrderDetail
    onClose: () => void;
    onSaved: () => void | Promise<void>
    canManageItems: boolean
};

type OrderTab = "products" | "warehouseItems"

export default function OrderModal({
    order, onClose, onSaved, canManageItems
}: Props){
    const [activeTab, setActiveTab] = useState<OrderTab>("products")

    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<OrderProductRow | null>(null)

    const [showEditModal, setShowEditModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const sections = useOrderDetailSection(order)
    const products = useOrderProducts(order.items)

    const {
        itemToDelete, deleteError, deleting,
        openDeleteModal, closeDeleteModal, handleDelete
    } = useOrderDeleteItem({
        orderId: order.id,
        onSaved
    })

    const handleEditProduct = (product: OrderProductRow) => {
        setSelectedProduct(product)
    }

    const {productColumns, warehouseItemColumns} = useOrderModalTableColumns({
        onEditProduct: handleEditProduct,
        onDeleteProduct: openDeleteModal,
        canManageItems
    })

    return(
        <>
            <BaseModal
                title={`Objednavka ${order.orderNumber}`}
                onClose={onClose}
            >
                {sections.map(section => (
                    <section
                        key={section.title}
                        className="mb-4"
                    >
                        <h6>{section.title}</h6>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}
                <div className="d-flex gap-2 mb-4">
                    {canManageItems && (
                        <>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => setShowEditModal(true)}
                            >
                                <i className="bi bi-pencil me-1" />
                                Upravit objednávku
                            </button>

                            <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => setShowAddItemModal(true)}
                            >
                                <i className="bi bi-plus-lg me-1" />
                                Přidat produkt
                            </button>
                        </>
                    )}

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setShowStatusModal(true)}
                    >
                        <i className="bi bi-arrow-left-right me-1" />
                        Změnit stav
                    </button>
                </div>

                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${
                                activeTab === "products" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("products")}
                        >
                            Produkty ({products.length})
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                            type="button"
                            className={`nav-link ${
                                activeTab === "warehouseItems" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("warehouseItems")}
                        >
                            Skladove polozky ({order.items.length})
                        </button>
                    </li>
                </ul>

                {activeTab === "products" && (
                    <Table<OrderProductRow>
                        columns={productColumns}
                        data={products}
                        getRowKey={product => product.productId}
                        emptyMessage="Objednavka neobsahuje zadne produkty"
                    />
                )}

                {activeTab === "warehouseItems" && (
                    <Table
                        columns={warehouseItemColumns}
                        data={order.items}
                        getRowKey={item => item.id}
                        emptyMessage="Objednavka neobsahuje zadne skladove polozky"
                    />
                )}
            </BaseModal>
            <OrderItemAddModal
                show={showAddItemModal}
                orderId={order.id}
                onClose={() => setShowAddItemModal(false)}
                onSaved={onSaved}
            />

            <OrderItemEditModal
                show={selectedProduct !== null}
                orderId={order.id}
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onSaved={onSaved}
            />

            <ConfirmDeleteModal
                show={itemToDelete !== null}
                title="Odstranit produkt z objednavky"
                description="Opravdu chcete odstranit tento produkt z objednavky"
                itemName={itemToDelete?.productName ?? ""}
                loading={deleting}
                error={deleteError}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
            />
            <OrderEditModal
                show={showEditModal}
                order={order}
                onClose={() => setShowEditModal(false)}
                onSaved={onSaved}
            />

            {showStatusModal && (
                <OrderStatusModal
                    order={order}
                    onClose={() => setShowStatusModal(false)}
                    onSaved={onSaved}
                />
            )}
        </>
    )
}