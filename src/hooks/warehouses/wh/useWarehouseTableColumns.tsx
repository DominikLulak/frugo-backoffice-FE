import type {Warehouse} from "../../../types/warehouse.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (warehouse: Warehouse) => void;
    onEdit: (warehouse: Warehouse) => void;
}

export default function useWarehouseTableColumns({onEdit, onDetail}:Props):TableColumn<Warehouse>[]{
    return [
        {
            key: "code",
            header: "Kod skladu",
            render: (warehouse) => warehouse.code
        },
        {
            key: "name",
            header: "Nazev skladu",
            render: (warehouse) => warehouse.name
        },
        {
            key: "description",
            header: "Popis skladu",
            render: (warehouse) => warehouse.description
        },
        {
            key: "actions",
            header: "Akce",
            render: (warehouse) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(warehouse)}
                    />
                    <EditButton
                        onClick={() => onEdit(warehouse)}
                    />
                </div>
            )
        },
    ]
}