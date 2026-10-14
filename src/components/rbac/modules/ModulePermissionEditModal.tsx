import type {Permission} from "../../../types/role.ts";
import useModulePermissionEditForm from "../../../hooks/rbac/modules/permissions/useModulePermissionEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    moduleId: number;
    moduleCode: string;
    permission: Permission | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function ModulePermissionEditModal({
    show, moduleId, moduleCode, permission, onClose, onSaved
}:Props){
    const {
        permissionCode, setPermissionCode, permissionName, setPermissionName,
        permissionDescription, setPermissionDescription, saving, errors, saveError,
        isEditing, handleSave
    } = useModulePermissionEditForm({moduleId, permission, onClose, onSaved})

    if(!show) {
        return null
    }

    return (
        <BaseModal
            title={isEditing ? "Upravit permission" : "Vytvorit permission"}
            onClose={onClose}
            secondLevel
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={handleSave}
                    cancelText="Zrusit"
                    submitText={isEditing ? "Ulozit zmeny" : "Vytvorit permission"}
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
                <FormField label="Kod modulu">
                    <input
                        type="text"
                        className="form-control"
                        value={moduleCode}
                        disabled
                        readOnly
                    />
                    {errors.permissionCode && (
                        <div className="text-danger small mt-1">
                            {errors.permissionCode}
                        </div>
                    )}
                </FormField>

                <FormField label="Kod permission">
                    <input
                        type="text"
                        className="form-control"
                        value={permissionCode}
                        onChange={(e) => setPermissionCode(e.target.value)}
                        disabled={saving}
                    />
                    {errors.permissionCode && (
                        <div className="text-danger small mt-1">
                            {errors.permissionCode}
                        </div>
                    )}
                </FormField>

                <FormField label="Nazev permission">
                    <input
                        type="text"
                        className="form-control"
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                        disabled={saving}
                    />
                    {errors.permissionName && (
                        <div className="text-danger small mt-1">
                            {errors.permissionName}
                        </div>
                    )}
                </FormField>

                <FormField label="Popis permission">
                    <input
                        type="text"
                        className="form-control"
                        value={permissionDescription}
                        onChange={(e) => setPermissionDescription(e.target.value)}
                        disabled={saving}
                    />
                    {errors.permissionDescription && (
                        <div className="text-danger small mt-1">
                            {errors.permissionDescription}
                        </div>
                    )}
                </FormField>
            </FormSection>
        </BaseModal>
    )
}