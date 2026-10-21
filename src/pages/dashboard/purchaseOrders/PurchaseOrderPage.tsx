import type {PurchaseOrder} from "../../../types/purchaseOrder.ts";
import PurchaseOrderModal from "../../../components/purchaseOrders/PurchaseOrderModal.tsx";
import PurchaseOrderCreateModal from "../../../components/purchaseOrders/purchaseOrderEdit/PurchaseOrderCreateModal.tsx";
import ConfirmDeleteModal from "../../../components/common/modal/ConfirmDeleteModal.tsx";
import usePurchaseOrderList from "../../../hooks/purchaseOrder/page/usePurchaseOrderList.ts";
import usePurchaseOrderFilters from "../../../hooks/purchaseOrder/page/usePurchaseOrderFilters.ts";
import usePurchaseOrderModals from "../../../hooks/purchaseOrder/page/usePurchaseOrderModals.ts";
import useDeletePurchaseOrder from "../../../hooks/purchaseOrder/page/useDeletePurchaseOrder.ts";
import usePurchaseOrderTableColumns from "../../../hooks/purchaseOrder/page/usePurchaseOrderTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";

export default function PurchaseOrderPage(){
    const {
        purchaseOrders, filters, updateFilters, fetchPurchaseOrders,
        loading, loadError
    } = usePurchaseOrderList()

    const filterFields = usePurchaseOrderFilters({
        filters, updateFilters
    })

    const purchaseOrderModal = usePurchaseOrderModals({
        onSaved: () => fetchPurchaseOrders(true, filters)
    })

    const {purchaseOrderToDelete, deleting, deleteError,
        openDeleteModal, closeDeleteModal, handleDelete
    } = useDeletePurchaseOrder(() => fetchPurchaseOrders(true, filters))

    const handleFilter = async () => {
        await fetchPurchaseOrders(true, filters)
    }

    const columns = usePurchaseOrderTableColumns({
        onDetail: purchaseOrderModal.openDetail,
        onDelete: openDeleteModal
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Nakupni objednavky"
                actionLabel="Pridat nakupni objednavku"
                onAction={purchaseOrderModal.openCreate}
            />

            <Filters
                fields={filterFields}
                onSubmit={handleFilter}
            />

            <Table<PurchaseOrder>
                columns={columns}
                data={purchaseOrders}
                getRowKey={(purchaseOrder) => purchaseOrder.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam nakupni objednavky..."
                emptyMessage="Nebyly nalezeny zadne nakupni objednavky"
            />

            {purchaseOrderModal.selectedPurchaseOrder && (
                <PurchaseOrderModal
                    purchasedOrderId={purchaseOrderModal.selectedPurchaseOrder.id}
                    purchaseOrder={purchaseOrderModal.selectedPurchaseOrder}
                    onClose={purchaseOrderModal.closeDetail}
                    onSaved={purchaseOrderModal.handlePurchaseOrderSaved}
                />
            )}

            <PurchaseOrderCreateModal
                key={`${purchaseOrderModal.showCreateModal}`}
                show={purchaseOrderModal.showCreateModal}
                onClose={purchaseOrderModal.closeCreate}
                onSaved={() => fetchPurchaseOrders(true, filters)}
            />

            {purchaseOrderToDelete && (
                <ConfirmDeleteModal
                    show={true}
                    title="Odstranit nakupni objednavku"
                    description="Opravdu chcete odstranit nakupni objednavku vcetne vsech jejich polozek?"
                    itemName={purchaseOrderToDelete?.purchaseOrderNumber ?? ""}
                    loading={deleting}
                    error={deleteError}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}