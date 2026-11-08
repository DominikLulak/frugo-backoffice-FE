import type {TableColumn} from "../../../components/common/Table.tsx";
import type {ShipmentPallet} from "../../../types/shipment.ts";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";

type Props = {
    onOpenPallet: (
        palletId: number,
        palletNumber: string
    ) => void
}

export default function useShipmentDetailColumns({onOpenPallet}:Props):TableColumn<ShipmentPallet>[]{
    return [
        {
            key: "palletNumber",
            header: "Cislo palety",
            render: (item) => item.palletNumber
        },
        {
            key: "palletClosed",
            header: "Stav palety",
            render: (item) => item.palletClosed ? "Ano" : "Ne"
        },
        {
            key: "statusCode",
            header: "Stav palety",
            render: (item) => item.statusCode
        },
        {
            key: "actions",
            header: "Akce",
            render: (item) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onOpenPallet(
                            item.palletId,
                            item.palletNumber
                        )}
                    />
                </div>
            )
        },

    ]
}