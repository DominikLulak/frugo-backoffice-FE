import type {Pallet} from "../../types/pallet.ts";
import type {TableColumn} from "../../components/common/Table.tsx";
import DetailButton from "../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (pallet: Pallet) => void;
}

export default function usePalletsColumns({onDetail}:Props):TableColumn<Pallet>[]{
    return [
        {
            key: "palletNumber",
            header: "Cislo palety",
            render: (pallet) => pallet.palletNumber
        },
        {
            key: "locationCode",
            header: "Kod lokace",
            render: (pallet) => pallet.locationCode
        },
        {
            key: "closed",
            header: "Stav palety",
            render: (pallet) => pallet.closed ? "Uzavrena" : "Neuzavrena"
        },
        {
            key: "actions",
            header: "Akce",
            render: (pallet) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(pallet)}
                    />
                </div>
            )
        },

    ]
}