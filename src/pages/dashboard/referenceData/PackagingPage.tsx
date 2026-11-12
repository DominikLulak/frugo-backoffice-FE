import usePackagingList from "../../../hooks/referenceData/packaging/usePackagingList.ts";
import usePackagingModal from "../../../hooks/referenceData/packaging/usePackagingModal.ts";
import usePackagingTableColumns from "../../../hooks/referenceData/packaging/usePackagingTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import type {Packaging} from "../../../types/product.ts";
import PackagingEditModal from "../../../components/referenceData/packaging/PackagingEditModal.tsx";

export default function PackagingPage(){
    const {packagings, fetchPackaging, loading, loadError} = usePackagingList()
    const {editingPackaging, showEditModal,
        openCreate, openEdit, closeEdit} = usePackagingModal()

    const columns = usePackagingTableColumns({
        onEdit: openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam typu baleni"
                actionLabel="Pridat novy typ baleni"
                onAction={openCreate}
            />

            <Table<Packaging>
                columns={columns}
                data={packagings}
                getRowKey={(packaging) => packaging.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam typy baleni..."
                emptyMessage="Nebyly nalezeny zadne typy baleni"
            />

            <PackagingEditModal
                key={`${showEditModal}-${editingPackaging?.id ?? "new"}`}
                show={showEditModal}
                packaging={editingPackaging}
                onClose={closeEdit}
                onSaved={() => fetchPackaging()}
            />
        </div>
    )
}