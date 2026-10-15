import type {ModuleDetail, Permission} from "../../../types/role.ts";
import useModulePermissionTableColumns from "../../../hooks/rbac/modules/page/useModulePermissionTableColumns.tsx";
import BaseModal from "../../common/modal/BaseModal.tsx";
import Table from "../../common/Table.tsx";
import useModulePermissionModal from "../../../hooks/rbac/modules/permissions/useModulePermissionModal.ts";
import ModulePermissionEditModal from "./ModulePermissionEditModal.tsx";


type Props = {
    module: ModuleDetail
    onClose: () => void
    onRefresh: () => void | Promise<void>
}

export default function ModuleModal({
    module,
    onClose,
    onRefresh
}:Props){
    const {
        showPermissionModal, editingPermission, openEditPermission,
        openCreatePermission, closePermissionModal} = useModulePermissionModal()

    const permissionsColumns = useModulePermissionTableColumns({
        onEdit: openEditPermission
    });

    return(
        <>
            <BaseModal
                title={`Detail modulu ${module.moduleName}`}
                onClose={onClose}
            >
                <h6>Permissions</h6>
                <button
                    type="button"
                    className="btn btn-success btn-sm mb-2"
                    onClick={openCreatePermission}
                >
                    Vytvorit permission
                </button>

                <Table<Permission>
                    columns={permissionsColumns}
                    data={module.permissions}
                    getRowKey={(permission) => permission.id}
                    className="table-sm"
                    emptyMessage="No permissions"
                />
            </BaseModal>

            <ModulePermissionEditModal
                key={`${module.id}-${editingPermission?.id} ?? 'new'`}
                show={showPermissionModal}
                moduleId={module.id}
                moduleCode={module.moduleCode}
                permission={editingPermission}
                onClose={closePermissionModal}
                onSaved={onRefresh}
            />
        </>
    )
}