import type {Permission, RoleDetail, User} from "../../../types/role.ts";
import useRolePermissionTableColumns from "../../../hooks/rbac/roles/page/useRolePermissionTableColumns.tsx";
import useRoleUserColumns from "../../../hooks/rbac/roles/page/useRoleUserColumns.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import Table from "../../common/Table.tsx";
import {useState} from "react";
import RoleAddPermissionModal from "./RoleAddPermissionModal.tsx";
import ConfirmDeleteModal from "../../common/modal/ConfirmDeleteModal.tsx";
import useRoleRemovePermission from "../../../hooks/rbac/roles/detail/useRoleRemovePermission.ts";

type Props = {
    role: RoleDetail;
    onClose: () => void;
    onRefresh: () => void | Promise<void>;
}

export default function RoleModal({
    role,
    onClose,
    onRefresh
}:Props){
    const [showAddPermissionModal,setShowAddPermissionModal] = useState(false)

    const { permissionToRemove, removingPermission, removeError, requestRemovePermission,
        confirmRemovePermission, closeRemovePermissionModal
    } = useRoleRemovePermission({roleId: role.id, roleCode: role.code, onRefresh})

    const permissionColumns = useRolePermissionTableColumns({
        onRemove: requestRemovePermission,
        canManagePermission: role.code !== "GOD"
    });

    const userColumns = useRoleUserColumns();

    return(
        <>
            <BaseModal
                title={`Detail role ${role.name}`}
                onClose={onClose}
            >
                <h6>Permissions</h6>
                {role.code !== "GOD" && (
                    <button
                        type="button"
                        className="btn btn-success btn-sm mb-2"
                        onClick={() => setShowAddPermissionModal(true)}
                    >
                        Pridat opravneni
                    </button>
                )}
                <Table<Permission>
                    columns={permissionColumns}
                    data={role.permissions}
                    getRowKey={(permission) => permission.id}
                    className="table-sm"
                    emptyMessage={role.code === "GOD" ? "--" : "No permissions"}
                />

                <Table<User>
                    columns={userColumns}
                    data={role.users}
                    getRowKey={(user) => user.id}
                    className="table-sm"
                    emptyMessage="No users"
                />

                {showAddPermissionModal && (
                    <RoleAddPermissionModal
                        role={role}
                        onClose={() => setShowAddPermissionModal(false)}
                        onSaved={onRefresh}
                    />
                )}

                {permissionToRemove && (
                    <ConfirmDeleteModal
                        show={true}
                        title="Odebrat opraveni"
                        description="Opravdu chcete odebrat toto opravneni roli?"
                        itemName={`${permissionToRemove.permissionCode} - ${permissionToRemove.permissionName}`}
                        loading={removingPermission}
                        error={removeError}
                        onClose={closeRemovePermissionModal}
                        onConfirm={confirmRemovePermission}
                    />
                )}
            </BaseModal>
        </>
    )
}