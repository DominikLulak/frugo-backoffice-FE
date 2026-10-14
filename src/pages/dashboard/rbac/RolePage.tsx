import type {Role} from "../../../types/role.ts";
import RoleModal from "../../../components/rbac/roles/RoleModal.tsx";
import useRoleList from "../../../hooks/rbac/roles/page/useRoleList.ts";
import useRoleModal from "../../../hooks/rbac/roles/page/useRoleModal.ts";
import useRoleTableColumns from "../../../hooks/rbac/roles/page/useRoleTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import RoleEditModal from "../../../components/rbac/roles/RoleEditModal.tsx";

export default function RolePage(){
    const {
        roles, fetchRoles, loading, loadError
    } = useRoleList()

    const roleModals = useRoleModal({
        onSaved: () => fetchRoles()
    })

    const columns = useRoleTableColumns({
        onDetail: roleModals.openDetail,
        onEdit: roleModals.openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam roli"
                actionLabel="Pridat roli"
                onAction={roleModals.openCreate}
            />

            <Table<Role>
                columns={columns}
                data={roles}
                getRowKey={(role) => role.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam role..."
                emptyMessage="Nebyly nalezeny zadne role"
            />

            {roleModals.selectedRole && (
                <RoleModal
                    role={roleModals.selectedRole}
                    onClose={roleModals.closeDetail}
                    onRefresh={roleModals.refreshSelectedRole}
                />
            )}

            <RoleEditModal
                key={`${roleModals.showEditModal}-${roleModals.editingRole?.id ?? "new"}`}
                show={roleModals.showEditModal}
                role={roleModals.editingRole}
                onClose={roleModals.closeEdit}
                onSaved={() => fetchRoles()}
            />
        </div>
    )
}