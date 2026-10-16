import type {Pallet} from "../../../types/pallet.ts";
import PalletModal from "../../../components/pallets/PalletModal.tsx";
import usePalletsList from "../../../hooks/pallets/usePalletsList.ts";
import usePalletFilters from "../../../hooks/pallets/usePalletFilters.ts";
import usePalletsModal from "../../../hooks/pallets/usePalletsModal.ts";
import usePalletsColumns from "../../../hooks/pallets/usePalletsColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";

export default function PalletPage(){
    const {
        pallets, filters, updateFilters, fetchPallets,
        loading, loadError
    } = usePalletsList()

    const filterFields = usePalletFilters({
        filters,
        updateFilters
    })

    const palletModal = usePalletsModal()

    const handleFilter = async () => {
        await fetchPallets(true, filters)
    }

    const columns = usePalletsColumns({
        onDetail: palletModal.openDetail
    })

    return(
        <div className="container-fluid">

            <PageHeader
                title="Seznam palet"
            />

            <Filters
                fields={filterFields}
                onSubmit={handleFilter}
            />

            <Table<Pallet>
                columns={columns}
                data={pallets}
                getRowKey={(pallet) => pallet.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam palety..."
                emptyMessage="Nebly nalazeny zadne palty"
            />

            {palletModal.selectedPallet && (
                <PalletModal
                    pallet={palletModal.selectedPallet}
                    onClose={palletModal.closeDetail}
                />
            )}
        </div>
    )
}