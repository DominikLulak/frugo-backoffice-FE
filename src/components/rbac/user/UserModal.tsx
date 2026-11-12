import type {Role, UserDetail} from "../../../types/role.ts";
import {useState} from "react";
import useUserRemoveRole from "../../../hooks/rbac/users/detail/useUserRemoveRole.ts";
import useUserRoleTableColumns from "../../../hooks/rbac/users/detail/useUserRoleTableColumns.tsx";
import KeyValueTable from "../../common/KeyValueTable.tsx";
import useUserDetailSection from "../../../hooks/rbac/users/detail/useUserDetailSection.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import Table from "../../common/Table.tsx";
import UserAddRoleModal from "./UserAddRoleModal.tsx";
import ConfirmDeleteModal from "../../common/modal/ConfirmDeleteModal.tsx";

type Props = {
    user: UserDetail;
    onClose: () => void;
    onRefresh: () => void | Promise<void>;
}

export default function UserModal({
    user,
    onClose,
    onRefresh
}:Props){
    const [showAddRoleModal, setShowAddRoleModal] = useState(false)

    const { roleToRemove, removingRole, removeError,
        requestRemoveRole, confirmRemoveRole, closeRemoveRoleModal
    } = useUserRemoveRole({userId: user.id, onRefresh})

    const roleColumns = useUserRoleTableColumns({
        onRemove: requestRemoveRole
    })

    const sections = useUserDetailSection(user);

    return(
        <>
            <BaseModal
                title={`Detail uzivatele ${user.fullName}`}
                onClose={onClose}
            >
                {sections.map((section) => (
                    <section key={section.title}>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

                <h6 className="mt-4">Roles</h6>
                <button
                    type="button"
                    className="btn btn-success btn-sm mb-3"
                    onClick={() => setShowAddRoleModal(true)}
                >
                    Pridat roli
                </button>

                <Table<Role>
                    columns={roleColumns}
                    data = {user.roles}
                    getRowKey={(role) => role.id}
                    loadingText="Nactiam role..."
                    emptyMessage="Nebyli nalezeny zadne role"
                />

                {showAddRoleModal && (
                    <UserAddRoleModal
                        user={user}
                        onClose={() => setShowAddRoleModal(false)}
                        onSaved={onRefresh}
                    />
                )}

                {roleToRemove && (
                    <ConfirmDeleteModal
                        show={true}
                        title="Odebrat roli"
                        description="Opravdu chcete odebrat tuto roli uzivateli"
                        itemName={`${roleToRemove.code} - ${roleToRemove.name}`}
                        loading={removingRole}
                        error={removeError}
                        onClose={closeRemoveRoleModal}
                        onConfirm={confirmRemoveRole}
                    />
                )}
            </BaseModal>
        </>
    )
}