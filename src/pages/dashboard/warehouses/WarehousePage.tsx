import type {Warehouse} from "../../../types/warehouse.ts";
import WarehouseModal from "../../../components/warehouses/wh/WarehouseModal.tsx";
import useWarehouseList from "../../../hooks/warehouses/wh/useWarehouseList.ts";
import useWarehouseModal from "../../../hooks/warehouses/wh/useWarehouseModal.ts";
import useWarehouseTableColumns from "../../../hooks/warehouses/wh/useWarehouseTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import WarehouseEditModal from "../../../components/warehouses/wh/WarehouseEditModal.tsx";

export default function WarehousePage(){
    const {warehouses, loading, loadError, fetchWarehouses} = useWarehouseList()
    const {
        selectedWarehouse, editingWarehouse, showEditModal,
        openDetail, closeDetail, openCreate, openEdit, closeEdit,
        handleWarehouseSave
    } = useWarehouseModal({
        onSaved: () => fetchWarehouses()
    })

    const columns = useWarehouseTableColumns({
        onDetail: openDetail,
        onEdit: openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam skladu"
                actionLabel="Pridat sklad"
                onAction={openCreate}
            />

            <Table<Warehouse>
                columns={columns}
                data={warehouses}
                getRowKey={(warehouse) => warehouse.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam sklady..."
                emptyMessage="Nebyly nalezeny zadne sklady"
            />

            <WarehouseEditModal
                key={`${showEditModal}-${editingWarehouse?.id ?? "new"}`}
                show={showEditModal}
                warehouse={editingWarehouse}
                onClose={closeEdit}
                onSaved={() => fetchWarehouses()}
            />

            {selectedWarehouse && (
                <WarehouseModal
                    warehouse={selectedWarehouse}
                    onClose={closeDetail}
                    onSaved={handleWarehouseSave}
                />
            )}
        </div>
    )
}