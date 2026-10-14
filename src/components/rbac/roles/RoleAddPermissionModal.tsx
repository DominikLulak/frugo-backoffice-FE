import type {RoleDetail} from "../../../types/role.ts";
import useRoleAvailablePermissions from "../../../hooks/rbac/roles/detail/useRoleAvailablePermissions.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";
import useRoleAddPermission from "../../../hooks/rbac/roles/detail/useRoleAddPermission.ts";

type Props = {
    role: RoleDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function RoleAddPermissionModal({ role, onClose, onSaved}:Props){

    const { saving, saveError, handleAddPermission } = useRoleAddPermission({roleId: role.id, onSaved, onClose})

    const {
        modules, selectedModuleId, selectedPermissionId, availablePermission, modulesLoading, modulesError,
        loadingPermissions, permissionsError, selectedModule, selectedPermission
    } = useRoleAvailablePermissions(role)

    return(
        <BaseModal
            title={`Pridat opravneni - ${role.name}`}
            onClose={onClose}
            secondLevel
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={() => {
                        if(selectedPermissionId === null) return

                        void handleAddPermission(selectedPermissionId)
                    }}
                    cancelText="Zrusit"
                    submitText="Pridat opraveni"
                    loadingText="Ukladam..."
                    isLoading={saving}
                    submitDisabled={
                        selectedModuleId === null ||
                        selectedPermissionId === null ||
                        loadingPermissions ||
                        !!permissionsError
                    }
                />
            }
        >
            {saveError && (
                <div className="alert alert-danger">
                    {saveError}
                </div>
            )}

            <FormField label="Modul">
                <select
                    id="permission-module"
                    className="form-select"
                    value={selectedModuleId ?? ""}
                    onChange={(e) => {
                        const value = e.target.value
                        selectedModule(value === "" ? null : Number(value))
                    }}
                    disabled={modulesLoading}
                >
                    <option value="">Vyberte modul</option>

                    {modules.map((module) => (
                        <option key={module.id} value={module.id}>
                            {module.moduleName}
                        </option>
                        ))}
                </select>

                {modulesLoading && (
                    <div className="form-text">Nacitam moduly...</div>
                )}
                {modulesError && (
                    <div className="text-danger mt-1">{modulesError}</div>
                )}
            </FormField>

            <FormField label="Opravneni">
                <select
                    id="permission-select"
                    className="form-select"
                    value={selectedPermissionId ?? ""}
                    onChange={(e) => {
                        const value = e.target.value
                        selectedPermission(value === "" ? null : Number(value))
                    }}
                    disabled={
                        selectedModuleId === null ||
                        loadingPermissions ||
                        !!permissionsError
                    }
                >
                    <option value="">Vyberte opravneni</option>

                    {availablePermission.map((permission) => (
                        <option key={permission.id} value={permission.id}>
                            {permission.permissionCode} - {permission.permissionName}
                        </option>
                    ))}
                </select>

                {loadingPermissions && (
                    <div className="form-text">Nacitam opraveni...</div>
                )}
                {permissionsError && (
                    <div className="text-danger mt-1">{permissionsError}</div>
                )}

                {selectedModuleId !== null &&
                    !loadingPermissions &&
                    !permissionsError &&
                    availablePermission.length === 0 && (
                        <div className="form-text">
                            Tento modul nema zadna dalsi dostupna opravneni
                        </div>
                    )
                }
            </FormField>
        </BaseModal>
    )
}