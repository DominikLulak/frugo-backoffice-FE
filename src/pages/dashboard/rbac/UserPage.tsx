import type {User} from "../../../types/role.ts";
import UserModal from "../../../components/rbac/user/UserModal.tsx";
import useUsersList from "../../../hooks/rbac/users/page/useUsersList.ts";
import useUserModal from "../../../hooks/rbac/users/page/useUserModal.ts";
import useUserTableColumns from "../../../hooks/rbac/users/page/useUserTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";

export default function UserPage(){
    const { users, fetchUsers, loading, loadError } = useUsersList()
    const userModals = useUserModal({
        onSaved: () => fetchUsers()
    })

    const columns = useUserTableColumns({
        onDetail: userModals.openDetail
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam uzivatelu"
            />

            <Table<User>
                columns={columns}
                data={users}
                getRowKey={(user) => user.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam uzivatele..."
                emptyMessage="Nebyli nalezeni zadni uzivatele"
            />

            {userModals.selectedUser && (
                <UserModal
                    user={userModals.selectedUser}
                    onClose={userModals.closeDetail}
                    onRefresh={userModals.refreshSelectedUser}
                />
            )}
        </div>
    )
}