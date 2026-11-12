import type {Role} from "../../../../types/role.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import DetailButton from "../../../../components/common/buttons/DetailButton.tsx";
import EditButton from "../../../../components/common/buttons/EditButton.tsx";

type Props = {
    onDetail: (role: Role) => void;
    onEdit: (role: Role) => void;
}

export default function useRoleTableColumns({onDetail, onEdit}:Props):TableColumn<Role>[]{
    return [
        {
            key: "code",
            header: "Kod role",
            render: (role) => role.code
        },
        {
            key: "name",
            header: "Nazev role",
            render: (role) => role.name
        },
        {
            key: "actions",
            header: "Akce",
            render: (role) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(role)}
                    />
                    <EditButton
                        onClick={() => onEdit(role)}
                    />
                </div>
            )
        }
    ]
}