import "../../modal.css";
import type {EmployeeDetail} from "../../../types/employee.ts";
import {useState} from "react";
import ConfirmationModal from "./ConfirmationModal.tsx";
import {createLogin} from "../../../api/EmployeeApi.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import EmployeeModalTable from "./table/EmployeeModalTable.tsx";
import useDeleteEmployeeLogin from "../../../hooks/employee/useDeleteEmployeeLogin.ts";
import ConfirmDeleteModal from "../../common/modal/ConfirmDeleteModal.tsx";

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
        employeeLoginToDelete,
        deleting,
        deleteError,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    } = useDeleteEmployeeLogin(employee.id, onSaved)

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState("")

    const closeCreateModal = () => {
        if(creating) return

        setShowConfirmation(false)
        setError("")
    }

    const handleCreate = async () => {
        try{
            setError("")
            setCreating(true)

            await createLogin(employee.id)
            await onCreate()

            setShowConfirmation(false)
        }catch{
            setError("Vytvareni loginu se nepodarilo")
        } finally {
            setCreating(false)
        }
    }

    return(
        <>
            <BaseModal
                title={`Zamestnanec ${employee.name}`}
                onClose={onClose}
            >
             <EmployeeModalTable
                 employee={employee}
                 onCreate={() => setShowConfirmation(true)}
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