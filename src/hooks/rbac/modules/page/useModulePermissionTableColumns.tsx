import type {Permission} from "../../../../types/role.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import EditButton from "../../../../components/common/buttons/EditButton.tsx";

type Props = {
    onEdit: (permission: Permission) => void
}

export default function useModulePermissionTableColumns({onEdit}:Props):TableColumn<Permission>[]{
    const columns: TableColumn<Permission>[] = [
        {
            key: "permissionCode",
            header: "Permission code",
            render: (permission) => permission.permissionCode
        },
        {
            key: "permissionName",
            header: "Permission name",
            render: (permission) => permission.permissionName
        },
        {
            key: "moduleName",
            header: "Module name",
            render: (permission) => permission.moduleName
        },
        {
            key: "permissionDescription",
            header: "Permission description",
            render: (permission) => permission.permissionDescription
        },
        {
            key: "actions",
            header: "Actions",
            render: (permission) => (
                <EditButton
                    onClick={() => onEdit(permission)}
                />
            )
        },
    ]

    return columns;
}