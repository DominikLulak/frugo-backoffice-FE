import type {Order} from "../../../types/order.ts";
import OrderModal from "../../../components/orders/OrderModal.tsx";
import useOrderList from "../../../hooks/orders/useOrderList.ts";
import useOrderFilters from "../../../hooks/orders/useOrderFilters.ts";
import useOrderModal from "../../../hooks/orders/useOrderModal.ts";
import useOrderTableColumns from "../../../hooks/orders/useOrderTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";
import OrderCreateModal from "../../../components/orders/OrderCreateModal.tsx";

export default function OrdersPage(){
    const {
        orders, filters, updateFilters, fetchOrders,
        loading, loadError
    } = useOrderList()

    const filterFields = useOrderFilters({
        filters, updateFilters
    })

    const {
        selectedOrder, showCreateModal, openDetail, closeDetail,
        openCreate, closeCreate, handleOrderSaved
    } = useOrderModal({
        onSaved: () => fetchOrders(true, filters)
    })

    const handleFilter = async () => {
        await fetchOrders(true, filters)
    }

    const columns = useOrderTableColumns({
        onDetail: openDetail
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Objednavky"
                actionLabel="Vytvorit novou objednavku"
                onAction={openCreate}
            />
            <Filters
                fields={filterFields}
                onSubmit={handleFilter}
            />

            <Table<Order>
                columns={columns}
                data={orders}
                getRowKey={(order) => order.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam objednavky..."
                emptyMessage="Nebyly nalezeny zadne objednavky"
            />

            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={closeDetail}
                    onSaved={handleOrderSaved}
                    canManageItems={
                        selectedOrder.statusCode === "ENTERED" ||
                        selectedOrder.statusCode === "BLOCKED"
                    }
                />
            )}

            <OrderCreateModal
                show={showCreateModal}
                onClose={closeCreate}
                onSaved={handleOrderSaved}
            />
        </div>
    )
}