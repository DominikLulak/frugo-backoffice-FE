import type {Permission} from "../../../../types/role.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import DeleteButton from "../../../../components/common/buttons/DeleteButton.tsx";

type Props = {
    onRemove: (permission: Permission) => void;
    canManagePermission: boolean;
}

export default function useRolePermissionTableColumns({
    onRemove, canManagePermission
}:Props): TableColumn<Permission>[]{
    const columns: TableColumn<Permission>[] = [
        {
            key: "permissionCode",
            header: "Permission Code",
            render: (permission) => permission.permissionCode
        },
        {
            key: "permissionName",
            header: "Permission Name",
            render: (permission) => permission.permissionName
        },
        {
            key: "permissionDescription",
            header: "Permission Description",
            render: (permission) => permission.permissionDescription
        },
    ]

    if(canManagePermission){
        columns.push({
            key: "actions",
            header: "Actions",
            render: (permission) => (
                <DeleteButton
                    onClick={() => onRemove(permission)}
                />
            )
        })
    }

    return columns;
}