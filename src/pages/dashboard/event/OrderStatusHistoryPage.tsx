import useOrderStatusHistoryList from "../../../hooks/event/purchaseOrderHistory/useOrderStatusHistoryList.ts";
import useOrderStatusHistoryFilters from "../../../hooks/event/purchaseOrderHistory/useOrderStatusHistoryFilters.ts";
import useOrderStatusHistoryColumns from "../../../hooks/event/purchaseOrderHistory/useOrderStatusHistoryColumns.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";
import type {OrderStatusHistory} from "../../../types/event.ts";

export default function OrderStatusHistoryPage(){
    const {
        statusHistories, filters, updateFilters, fetchStatusHistories,
        loading, loadError
    } = useOrderStatusHistoryList()

    const filteredFields = useOrderStatusHistoryFilters({
        filters, updateFilters
    })

    const handleFilter = async () => {
        await fetchStatusHistories(true, filters)
    }

    const columns = useOrderStatusHistoryColumns()

    return(
        <div className="container-fluid">
            <PageHeader title="Zmeny stavu objednavky"/>

            <Filters
                fields={filteredFields}
                onSubmit={handleFilter}
            />

            <Table<OrderStatusHistory>
                columns={columns}
                data={statusHistories}
                getRowKey={(statusHistory) => statusHistory.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam zmeny statusu objednavek..."
                emptyMessage="Nebyly nalezeny zadne zmeny stavu objednavek"
            />
        </div>
    )
}