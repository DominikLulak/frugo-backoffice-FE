import type {RoleDetail} from "../../../types/role.ts";
import useRoleEditForm from "../../../hooks/rbac/roles/edit/useRoleEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    role: RoleDetail | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function RoleEditModal({
    show,
    role,
    onClose,
    onSaved
}:Props){
    const {
        code, setCode, name, setName,
        saving, errors, saveError, isEditing, handleSave
    } = useRoleEditForm({roleId: role?.id ?? 0, role: role, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit roli" : "Vytvorit roli"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat roli"}
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
                <FormSection>
                    <FormField label="Kod role">
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
                    <FormField label="Nazev role">
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
                </FormSection>

            </BaseModal>
        </>
    )
}