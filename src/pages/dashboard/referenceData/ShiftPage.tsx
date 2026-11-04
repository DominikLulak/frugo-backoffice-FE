import type {Shift} from "../../../types/referenceData.ts";
import useShiftList from "../../../hooks/referenceData/shift/useShiftList.ts";
import useShiftModal from "../../../hooks/referenceData/shift/useShiftModal.ts";
import useShiftTableColumns from "../../../hooks/referenceData/shift/useShiftTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import ShiftEditModal from "../../../components/referenceData/shifts/ShiftEditModal.tsx";

export default function ShiftPage(){
    const {shifts, fetchShifts, loading, loadError} = useShiftList()
    const {
        editingShift, openEdit, showEditModal, openCreate, closeEdit
    } = useShiftModal()

    const columns = useShiftTableColumns({
        onEdit: openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam smen"
                actionLabel="Pridat novou smenu"
                onAction={openCreate}
            />

            <Table<Shift>
                columns={columns}
                data={shifts}
                getRowKey={(shift) => shift.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam smeny..."
                emptyMessage="Nebyly nalezeny zadne smeny"
            />

            <ShiftEditModal
                key={`${showEditModal}-${editingShift?.id ?? "new"}`}
                show={showEditModal}
                shift={editingShift}
                onClose={closeEdit}
                onSaved={() => fetchShifts()}
            />
        </div>
    )
}