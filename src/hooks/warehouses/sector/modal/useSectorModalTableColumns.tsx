import type {Location} from "../../../../types/warehouse.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import EditButton from "../../../../components/common/buttons/EditButton.tsx";

type Props = {
    onEdit: (location: Location) => void;
}

export default function useSectorModalTableColumns({onEdit}:Props):TableColumn<Location>[]{
    return [
        {
            key: "code",
            header: "Kod lokace",
            render: (location) => location.code
        },
        {
            key: "aisle",
            header: "Ulicka",
            render: (location) => location.aisle ?? "-"
        },
        {
            key: "rack",
            header: "Regal",
            render: (location) => location.rack ?? "-"
        },
        {
            key: "level",
            header: "Uroven",
            render: (location) => location.level ?? "-"
        },
        {
            key: "position",
            header: "Pozice",
            render: (location) => location.position ?? "-"
        },
        {
            key: "canBeOrdered",
            header: "Lze objednat",
            render: (location) => location.canBeOrdered ? "Ano" : "Ne"
        },
        {
            key: "actions",
            header: "Akce",
            render: (location) => (
                <div className="d-flex gap-2">
                    <EditButton
                        onClick={() => onEdit(location)}
                    />
                </div>
            )
        },
    ]
}