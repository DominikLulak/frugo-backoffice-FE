import type {Shipment} from "../../../types/shipment.ts";
import ShipmentModal from "../../../components/shipments/ShipmentModal.tsx";
import useShipmentList from "../../../hooks/shipments/useShipmentList.ts";
import useShipmentFilters from "../../../hooks/shipments/useShipmentFilters.ts";
import useShipmentModal from "../../../hooks/shipments/useShipmentModal.ts";
import useShipmentColumns from "../../../hooks/shipments/useShipmentColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";

export default function ShipmentsPage(){
    const {shipments, filters, updateFilters, fetchShipments,
        loading, loadError} = useShipmentList()

    const filterFields = useShipmentFilters({
        filters, updateFilters
    })

    const {selectedShipment, openDetail, closeDetail} = useShipmentModal()

    const handleFilter = async () => {
        await fetchShipments(true, filters)
    }

    const columns = useShipmentColumns({
        onDetail: openDetail
    })

    return(
        <div className="container-fluid">
            <PageHeader title="Zasilky"/>

            <Filters
                fields={filterFields}
                onSubmit={handleFilter}
            />

            <Table<Shipment>
                columns={columns}
                data={shipments}
                getRowKey={(shipment) => shipment.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam zasilky..."
                emptyMessage="Nebbyly nalezeny zadne zasilky"
            />

            {selectedShipment && (
                <ShipmentModal
                    shipment={selectedShipment}
                    onClose={closeDetail}
                />
            )}
        </div>
    )
}