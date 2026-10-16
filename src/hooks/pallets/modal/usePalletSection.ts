import type {KeyValueRow} from "../../../components/common/KeyValueTable.tsx";
import type {PalletDetail} from "../../../types/pallet.ts";

export type PalletDetailSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function usePalletSection(
    pallet: PalletDetail
):PalletDetailSection[]{
    return [
        {
            title: "Udaje palety",
            rows: [
                {label: "Cislo palety", value: pallet.palletNumber},
                {label: "Kod lokace", value: pallet.locationCode},
                {label: "Stav palety", value: pallet.closed ? "Uzavrena" : "Neuzavrena"},
            ]
        }
    ]
}