import type {StockMovement} from "../../../types/event.ts";
import StockMovementModal from "../../../components/event/StockMovementModal.tsx";
import useStockMovementList from "../../../hooks/event/stockMovement/useStockMovementList.ts";
import useStockMovementFilters from "../../../hooks/event/stockMovement/useStockMovementFilters.ts";
import useStockMovementModal from "../../../hooks/event/stockMovement/useStockMovementModal.ts";
import useStockMovementColumns from "../../../hooks/event/stockMovement/useStockMovementColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";

export default function StockMovementPage(){
    const {stockMovements, filters, updateFilters, fetchStockMovements, loading, loadError} = useStockMovementList()

    const filteredFields = useStockMovementFilters({
        filters, updateFilters
    })

    const {selectedStockMovement, openDetail, closeDetail} = useStockMovementModal()

    const handleFilter = async () => {
        await fetchStockMovements(true, filters)
    }

    const columns = useStockMovementColumns({
        onDetail: openDetail
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Skladove pohyby"
            />

            <Filters
                fields={filteredFields}
                onSubmit={handleFilter}
            />

            <Table<StockMovement>
                columns={columns}
                data={stockMovements}
                getRowKey={(stockMovement) => stockMovement.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam skladove pohyby..."
                emptyMessage="Nebyly nalezeny zadne skladove pohyby"
            />

            {selectedStockMovement && (
                <StockMovementModal
                    stockMovement={selectedStockMovement}
                    onClose={closeDetail}
                />
            )}
        </div>
    )
}