import type {JobPosition} from "../../../../types/department.ts";
import useJobPositionEditForm from "../../../../hooks/department/useJobPositionEditForm.ts";
import BaseModal from "../../../common/modal/BaseModal.tsx";
import ModalActions from "../../../common/modal/ModalActions.tsx";
import FormField from "../../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    departmentId: number;
    position: JobPosition | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function JobPositionEditModal({
    show,
    departmentId,
    position,
    onClose,
    onSaved
}:Props){
    const {
        name, setName,
        code, setCode,
        description, setDescription,
        saving, errors, saveError,
        isEditing, handleSave
    } = useJobPositionEditForm({
        departmentId,
        position,
        onClose,
        onSaved
    })

    if(!show) return null

    return(
        <BaseModal
            title={isEditing ? "Upravit pracovni pozici" : "Pridat pracovni pozici"}
            onClose={onClose}
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={handleSave}
                    cancelText="Zrusit"
                    submitText={isEditing ? "Ulozit zmeny" : "Vytvorit pozici"}
                    loadingText="Ukladam..."
                    isLoading={saving}
                />
            }
        >
            {saveError && (
                <div className="alert alert-danger">
                    {saveError}
                </div>
            )}

            <FormField label="Kod pozice">
                <input
                    type="text"
                    className="form-control"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={saving}
                />
                {errors.code && (
                    <div className="text-danger small mt-1">{errors.code}</div>
                )}
            </FormField>
            <FormField label="Nazev pozice">
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={saving}
                />
                {errors.name && (
                    <div className="text-danger small mt-1">{errors.name}</div>
                )}
            </FormField>
            <FormField label="Kod pozice">
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={saving}
                />
                {errors.description && (
                    <div className="text-danger small mt-1">{errors.description}</div>
                )}
            </FormField>
        </BaseModal>
    )
}