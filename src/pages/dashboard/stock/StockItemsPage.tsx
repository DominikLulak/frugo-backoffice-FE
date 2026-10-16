import type {StockItem} from "../../../types/stock.ts";
import StockItemModal from "../../../components/stock/StockItemModal.tsx";
import useStockItemsList from "../../../hooks/stockItems/useStockItemsList.ts";
import useStockItemFilters from "../../../hooks/stockItems/useStockItemFilters.ts";
import useStockItemModal from "../../../hooks/stockItems/useStockItemModal.ts";
import useStockItemColumns from "../../../hooks/stockItems/useStockItemColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";

export default function StockItemsPage(){
    const {
        stockItems, filters, updateFilters, fetchStockItems,
        loading, loadError
    } = useStockItemsList()

    const filterFields = useStockItemFilters({
        filters,
        updateFilters
    })

    const stockItemModal = useStockItemModal()

    const handleFilter = async () => {
        await fetchStockItems(true, filters)
    }

    const columns = useStockItemColumns({
        onDetail: stockItemModal.openDetail
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Polozky na sklade"
            />

            <Filters
                fields={filterFields}
                onSubmit={handleFilter}
            />

            <Table<StockItem>
                columns={columns}
                data={stockItems}
                getRowKey={(stockItem) => stockItem.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam skladove polozky..."
                emptyMessage="Nebyly nalezeny zadne skladove polozky"
            />

            {stockItemModal.selectedStockItem && (
                <StockItemModal
                    stockItem={stockItemModal.selectedStockItem}
                    onClose={stockItemModal.closeDetail}
                />
            )}
        </div>
    )
}