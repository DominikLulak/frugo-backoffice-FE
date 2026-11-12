import type {DepartmentDetail} from "../../../../types/department.ts";
import useDepartmentEditForm from "../../../../hooks/department/useDepartmentEditForm.ts";
import BaseModal from "../../../common/modal/BaseModal.tsx";
import ModalActions from "../../../common/modal/ModalActions.tsx";
import FormField from "../../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    department: DepartmentDetail | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function DepartmentEditModal({
    show,
    department,
    onClose,
    onSaved
}:Props){
    const {
        name,
        setName,
        code,
        setCode,
        description,
        setDescription,
        saving,
        errors,
        saveError,
        isEditing,
        handleSave
    } = useDepartmentEditForm({departmentId: department?.id ?? 0, department: department, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit oddeleni" : "Vytvorit oddeleni"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Vytvorit oddeleni"}
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

                <FormField label="Kod oddeleni">
                    <input
                        type="text"
                        className="form-control"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={saving}
                    />
                    {errors.code && (
                        <div className="text-danger small mt-1">
                            {errors.code}
                        </div>
                    )}
                </FormField>
                <FormField label="Nazev oddeleni">
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={saving}
                    />
                    {errors.name && (
                        <div className="text-danger small mt-1">
                            {errors.name}
                        </div>
                    )}
                </FormField>
                <FormField label="Popis">
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={saving}
                    />
                    {errors.description && (
                        <div className="text-danger small mt-1">
                            {errors.description}
                        </div>
                    )}
                </FormField>
            </BaseModal>
        </>
    )
}