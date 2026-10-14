import type {Role} from "../../../../types/role.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import DeleteButton from "../../../../components/common/buttons/DeleteButton.tsx";

type Props = {
    onRemove: (role: Role) => void;
}

export default function useUserRoleTableColumns({
    onRemove
}:Props): TableColumn<Role>[]{
    const columns: TableColumn<Role>[] = [
        {
            key: "code",
            header: "Role Code",
            render: (role) => role.code
        },
        {
            key: "name",
            header: "Role Name",
            render: (role) => role.name
        },
        {
            key: "actions",
            header: "Actions",
            render: (role) => (
                <DeleteButton
                    onClick={() => onRemove(role)}
                />
            )
        }
    ]

    return columns;

}