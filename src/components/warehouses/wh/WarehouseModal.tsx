import "../../modal.css"
import type {WarehouseDetail, WarehouseSector} from "../../../types/warehouse.ts";
import SectorDetailModal from "../sector/SectorDetailModal.tsx";
import useSectorModal from "../../../hooks/warehouses/sector/useSectorModal.ts";
import useWarehouseDetailSection from "../../../hooks/warehouses/wh/modal/useWarehouseDetailSection.ts";
import useWarehouseModalTableColumns from "../../../hooks/warehouses/wh/modal/useWarehouseModalTableColumns.tsx";
import BaseModal from "../../common/modal/BaseModal.tsx";
import KeyValueTable from "../../common/KeyValueTable.tsx";
import Table from "../../common/Table.tsx";
import SectorEditModal from "../sector/SectorEditModal.tsx";

type Props = {
    warehouse: WarehouseDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function WarehouseModal({
    warehouse,
    onClose,
    onSaved
}:Props){

    const {
        selectedSector, editingSector, showEditModal,
        openDetail, closeDetail, openCreate, openEdit, closeEdit,
        handleSectorSave
    } = useSectorModal({onSaved})

    const warehouseSections = useWarehouseDetailSection(warehouse)

    const sectorColumns = useWarehouseModalTableColumns({
        onDetail: openDetail,
        onEdit: openEdit
    })

    return(
        <>
            <BaseModal
                title={`Detail skladu ${warehouse.code}`}
                onClose={onClose}
            >
                {warehouseSections.map((section) => (
                    <section key={section.title} className="mb-4">
                        <h6>{section.title}</h6>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

                <section>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Sektory</h6>

                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={openCreate}
                        >
                            Pridat sektor
                        </button>
                    </div>

                    <Table<WarehouseSector>
                        columns={sectorColumns}
                        data={warehouse.sectors}
                        getRowKey={(sector) => sector.id}
                    />
                </section>

                {selectedSector && (
                    <SectorDetailModal
                        sector={selectedSector}
                        onClose={closeDetail}
                        onSaved={handleSectorSave}
                    />
                )}

                <SectorEditModal
                    key={`${showEditModal}-${editingSector?.id ?? "new"}`}
                    show={showEditModal}
                    warehouseId={warehouse.id}
                    sector={editingSector}
                    onClose={closeEdit}
                    onSaved={handleSectorSave}
                />
            </BaseModal>
        </>
    )
}