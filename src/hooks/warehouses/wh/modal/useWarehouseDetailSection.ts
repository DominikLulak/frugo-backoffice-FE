import type {KeyValueRow} from "../../../../components/common/KeyValueTable.tsx";
import type {WarehouseDetail} from "../../../../types/warehouse.ts";

export type WarehouseDetailSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useWarehouseDetailSection(
    warehouse: WarehouseDetail
):WarehouseDetailSection[]{
    return [
        {
            title: "Sklad",
            rows:[
                {label: "Kod skladu", value: warehouse.code},
                {label: "Nazev skladu", value: warehouse.name},
                {label: "Popis skladu", value: warehouse.description}
            ]
        }
    ]
}