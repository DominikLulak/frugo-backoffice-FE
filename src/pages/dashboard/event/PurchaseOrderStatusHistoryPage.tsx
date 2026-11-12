import type {PurchaseOrderStatusHistory} from "../../../types/event.ts";
import usePOStatusHistoryList from "../../../hooks/event/purchaseOrderStatusHistory/usePOStatusHistoryList.ts";
import usePOStatusHistoryFilters from "../../../hooks/event/purchaseOrderStatusHistory/usePOStatusHistoryFilters.ts";
import usePOStatusHistoryColumns from "../../../hooks/event/purchaseOrderStatusHistory/usePOStatusHistoryColumns.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";

export default function PurchaseOrderStatusHistoryPage(){
    const {statusHistories, filters, fetchStatusHistories, updateFilters, loading, loadError} = usePOStatusHistoryList()

    const filteredFields = usePOStatusHistoryFilters({
        filters, updateFilters
    })

    const handleFilter = async () => {
        await fetchStatusHistories(true, filters)
    }

    const columns = usePOStatusHistoryColumns()

    return(
        <div className="container-fluid">
            <PageHeader
                title="Zmeny stavu nakupni objednavky"
            />

            <Filters
                fields={filteredFields}
                onSubmit={handleFilter}
            />

            <Table<PurchaseOrderStatusHistory>
                columns={columns}
                data={statusHistories}
                getRowKey={(statusHistory) => statusHistory.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam zmeny statusu PO..."
                emptyMessage="Nebyly nalezeny zadne zmeny stavu nakupnich objednavek"
            />

        </div>
    )
}