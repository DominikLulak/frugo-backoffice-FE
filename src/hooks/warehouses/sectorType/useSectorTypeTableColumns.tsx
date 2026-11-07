import type {SectorType} from "../../../types/warehouse.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";

type Props = {
    onEdit: (sectorType: SectorType) => void;
}

export default function useSectorTypeTableColumns({onEdit}:Props):TableColumn<SectorType>[]{
    return [
        {
            key: "code",
            header: "Kod typu sektoru",
            render: (sectorType) => sectorType.code
        },
        {
            key: "name",
            header: "Nazev typu sektoru",
            render: (sectorType) => sectorType.name
        },
        {
            key: "description",
            header: "Popis typu sektoru",
            render: (sectorType) => sectorType.description
        },
        {
            key: "actions",
            header: "Akce",
            render: (sectorType) => (
                <div className="d-flex gap-2">
                    <EditButton
                        onClick={() => onEdit(sectorType)}
                    />
                </div>
            )
        },
    ]
}