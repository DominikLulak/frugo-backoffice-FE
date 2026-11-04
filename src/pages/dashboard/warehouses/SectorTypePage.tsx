import useSectorTypesList from "../../../hooks/warehouses/sectorType/useSectorTypesList.ts";
import useSectorTypeModal from "../../../hooks/warehouses/sectorType/useSectorTypeModal.ts";
import useSectorTypeTableColumns from "../../../hooks/warehouses/sectorType/useSectorTypeTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import SectorTypeEditModal from "../../../components/warehouses/sectorType/SectorTypeEditModal.tsx";

export default function SectorTypePage(){
    const {sectorTypes, fetchSectorTypes, loadingSectorTypes, sectorTypesError} = useSectorTypesList()
    const {
        editingSectorType, showEditModal, openEdit, openCreate, closeEdit
    } = useSectorTypeModal()

    const columns = useSectorTypeTableColumns({
        onEdit: openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam typu sektoru"
                actionLabel="Pridat novy typ sektoru"
                onAction={openCreate}
            />

            <Table
                columns={columns}
                data={sectorTypes}
                getRowKey={(sectorType) => sectorType.id}
                loading={loadingSectorTypes}
                error={sectorTypesError}
                loadingText="Nacitam typy sektoru..."
                emptyMessage="Nebyly nalezeny zadne typy sektoru"
            />

            <SectorTypeEditModal
                key={`${showEditModal}-${editingSectorType?.id ?? "new"}`}
                show={showEditModal}
                sectorType={editingSectorType}
                onClose={closeEdit}
                onSaved={() => fetchSectorTypes()}
            />
        </div>
    )
}