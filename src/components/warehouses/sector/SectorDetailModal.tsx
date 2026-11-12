import "../../modal.css"
import type {Location, SectorDetail} from "../../../types/warehouse.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import useLocationModal from "../../../hooks/warehouses/location/useLocationModal.ts";
import useSectorDetailSection from "../../../hooks/warehouses/sector/modal/useSectorDetailSection.ts";
import useSectorModalTableColumns from "../../../hooks/warehouses/sector/modal/useSectorModalTableColumns.tsx";
import KeyValueTable from "../../common/KeyValueTable.tsx";
import Table from "../../common/Table.tsx";
import LocationEditModal from "../location/LocationEditModal.tsx";

type Props = {
    sector: SectorDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function SectorDetailModal({
    sector,
    onClose,
    onSaved
}:Props){
    const {
        editingLocation, showEditModal,
        openCreate, openEdit, closeEdit, handleLocationSave
    } = useLocationModal({onSaved})

    const sections = useSectorDetailSection(sector);
    const columns = useSectorModalTableColumns({
        onEdit: openEdit
    })

    return(
        <>
            <BaseModal
                title={`Sektor ${sector.name}`}
                onClose={onClose}
                level={2}
            >
                {sections.map((section) => (
                    <section key={section.title}>
                        <h6>{section.title}</h6>

                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

                <section>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Lokace</h6>

                        <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={openCreate}
                        >
                            Pridat Lokaci
                        </button>
                    </div>

                    <Table<Location>
                        columns={columns}
                        data={sector.locations}
                        getRowKey={(location) => location.id}
                    />
                </section>

                <LocationEditModal
                    key={`${showEditModal}-${editingLocation?.id ?? "new"}`}
                    show={showEditModal}
                    sectorId={sector.id}
                    sectorCode={sector.code}
                    location={editingLocation}
                    onClose={closeEdit}
                    onSaved={handleLocationSave}
                />
            </BaseModal>
        </>
    )
}