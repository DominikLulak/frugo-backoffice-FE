import type {WarehouseSector} from "../../../../types/warehouse.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import DetailButton from "../../../../components/common/buttons/DetailButton.tsx";
import EditButton from "../../../../components/common/buttons/EditButton.tsx";

type Props = {
    onDetail: (sector: WarehouseSector) => void;
    onEdit: (sector: WarehouseSector) => void;
}

export default function useWarehouseModalTableColumns({onDetail, onEdit}:Props):TableColumn<WarehouseSector>[]{
    return [
        {
            key: "code",
            header: "Kod sektoru",
            render: (sector) => sector.code
        },
        {
            key: "name",
            header: "Nazev sektoru",
            render: (sector) => sector.name
        },
        {
            key: "typeCode",
            header: "Kod typu sektoru",
            render: (sector) => sector.typeCode
        },
        {
            key: "typeName",
            header: "Nazev typu sektoru",
            render: (sector) => sector.typeName
        },
        {
            key: "description",
            header: "Popis sektoru",
            render: (sector) => sector.description
        },
        {
            key: "actions",
            header: "Akce",
            render: (sector) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(sector)}
                    />
                    <EditButton
                        onClick={() => onEdit(sector)}
                    />
                </div>
            )
        }
    ]
}