import "../modal.css"
import type {ShipmentDetail, ShipmentPallet} from "../../types/shipment.ts";
import PalletModal from "./PalletModal.tsx";
import useShipmentPalletModal from "../../hooks/shipments/modal/useShipmentPalletModal.ts";
import useShipmentSection from "../../hooks/shipments/modal/useShipmentSection.ts";
import useShipmentDetailColumns from "../../hooks/shipments/modal/useShipmentDetailColumns.tsx";
import BaseModal from "../common/modal/BaseModal.tsx";
import KeyValueTable from "../common/KeyValueTable.tsx";
import Table from "../common/Table.tsx";

type Props = {
    shipment: ShipmentDetail;
    onClose: () => void;
}

export default function ShipmentModal({
    shipment,
    onClose
}: Props){
    const {selectedPallet, palletItems, loading, error, openPallet, closePallet
    } = useShipmentPalletModal()

    const sections = useShipmentSection(shipment)
    const columns = useShipmentDetailColumns({
        onOpenPallet: openPallet
    })

    return(
        <>
            <BaseModal
                title={`Detail zasilky ${shipment.shipmentNumber}`}
                onClose={onClose}
            >
                {sections.map((section) => (
                    <section key={section.title}>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

                <Table<ShipmentPallet>
                    columns={columns}
                    data={shipment.pallets}
                    getRowKey={(item) => item.palletId}
                    loading={loading}
                    error={error}
                    loadingText="Nacitam polozky palety..."
                    emptyMessage="Nebyly nalezeny zadne polozky palety"
                />

                {selectedPallet && (
                    <PalletModal
                        palletNumber={selectedPallet.number}
                        items={palletItems}
                        onClose={closePallet}
                    />
                )}
            </BaseModal>
        </>
    )
}