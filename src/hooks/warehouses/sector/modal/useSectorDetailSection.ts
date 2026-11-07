import type {KeyValueRow} from "../../../../components/common/KeyValueTable.tsx";
import type {SectorDetail} from "../../../../types/warehouse.ts";

export type SectorDetailSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useSectorDetailSection(
    sector: SectorDetail
):SectorDetailSection[]{
    return [
        {
            title: "Sektor",
            rows: [
                {label: "Sklad", value: sector.warehouseCode},
                {label: "Kod sektoru", value: sector.code},
                {label: "Nazev sektoru", value: sector.name},
                {label: "Kod typu sektoru", value: sector.typeCode},
                {label: "Nazev typu sektoru", value: sector.typeName},
                {label: "Popis sektoru", value: sector.description},
            ]
        }
    ]
}