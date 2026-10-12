import "../../modal.css";
import type {EmployeeDetail} from "../../../types/employee.ts";
import ConfirmationModal from "./ConfirmationModal.tsx";
import BaseModal from "../../common/modal/BaseModal.tsx";
import EmployeeModalTable from "./table/EmployeeModalTable.tsx";
import useDeleteEmployeeLogin from "../../../hooks/employee/edit/useDeleteEmployeeLogin.ts";
import ConfirmDeleteModal from "../../common/modal/ConfirmDeleteModal.tsx";
import useEmployeeCreateLogin from "../../../hooks/employee/edit/useEmployeeCreateLogin.ts";

type Props = {
    employee: EmployeeDetail;
    onClose: () => void;
    onCreate: () => void | Promise<void>;
    onSaved: () => void;
};

export default function EmployeeModal({
    employee,
    onClose,
    onCreate,
    onSaved
}: Props){
    const{
        employeeLoginToDelete, deleting, deleteError,
        openDeleteModal, closeDeleteModal, handleDelete
    } = useDeleteEmployeeLogin(employee.id, onSaved)

    const {
        showConfirmation, creating, error,
        openCreateModal, closeCreateModal, handleCreate
    } = useEmployeeCreateLogin({employeeId: employee.id, onCreate})

    return(
        <>
            <BaseModal
                title={`Zamestnanec ${employee.name}`}
                onClose={onClose}
            >
             <EmployeeModalTable
                 employee={employee}
                 onCreate={openCreateModal}
                 onDelete={openDeleteModal}
             />
            </BaseModal>

            <ConfirmationModal
                show={showConfirmation}
                title="Vytvorit login"
                loading={creating}
                description="Chcete vytvorit login pro uzivatele?"
                itemName={`${employee.name} (${employee.employeeNumber})`}
                error={error}
                onClose={closeCreateModal}
                onConfirm={handleCreate}
            />

            {employeeLoginToDelete && (
                <ConfirmDeleteModal
                    show={true}
                    title="Odstranit login"
                    description="Opravdu chcete odstranit login?"
                    itemName={employee?.loginUsername ?? "-"}
                    loading={deleting}
                    error={deleteError}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                />
            )}
        </>
    )
}