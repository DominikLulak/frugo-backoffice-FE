import type {UserDetail} from "../../../types/role.ts";
import useUserAddRole from "../../../hooks/rbac/users/detail/useUserAddRole.ts";
import useUserAvailableRoles from "../../../hooks/rbac/users/detail/useUserAvailableRoles.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    user: UserDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function UserAddRoleModal({ user, onClose, onSaved}:Props){
    const {saving, saveError, handleAddRole} = useUserAddRole({userId: user.id, onSaved, onClose})

    const {
        availableRoles, selectedRoleId, selectedRole,
        rolesLoading, roleError
    } = useUserAvailableRoles(user)

    return(
        <BaseModal
            title={`Pridat roli uzivateli ${user.fullName}`}
            onClose={onClose}
            secondLevel
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={() => {
                        if(selectedRoleId === null) return
                        void handleAddRole(selectedRoleId)
                    }}
                    cancelText="Zrusit"
                    submitText="Pridat roli"
                    loadingText="Ukladam..."
                    isLoading={saving}
                    submitDisabled={
                        selectedRoleId === null ||
                        rolesLoading ||
                        !!roleError
                    }
                />
            }
        >
            {saveError && (
                <div className="alert alert-danger">
                    {saveError}
                </div>
            )}

            <FormField label="Role">
                <select
                    id="role-select"
                    className="form-select"
                    value={selectedRoleId ?? ""}
                    onChange={(e) => {
                        const value  = e.target.value
                        selectedRole(value === "" ? null : Number(value))
                    }}
                    disabled={rolesLoading || !!roleError}
                >
                    <option value="">Vyberte roli</option>

                    {availableRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.code} - {role.name}
                        </option>
                    ))}
                </select>

                {rolesLoading && (
                    <div className="form-text">Nacitam role...</div>
                )}
                {roleError && (
                    <div className="text-danger mt-1">{roleError}</div>
                )}

                {selectedRoleId !== null &&
                    !rolesLoading &&
                    !roleError &&
                    availableRoles.length === 0 && (
                        <div className="form-text">
                            Tento uzivatel jiz ma vsechny role
                        </div>
                    )
                }
            </FormField>
        </BaseModal>
    )
}