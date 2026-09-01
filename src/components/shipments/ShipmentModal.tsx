import "../modal.css"
import type {PalletWarehouseItem, ShipmentDetail} from "../../types/shipment.ts";
import {useState} from "react";
import {getPalletItems} from "../../api/ShipmentsApi.ts";
import PalletModal from "./PalletModal.tsx";

type Props = {
    shipment: ShipmentDetail;
    onClose: () => void;
}

export default function ShipmentModal({
    shipment,
    onClose
}: Props){

    const [palletItems, setPalletItems] = useState<PalletWarehouseItem[]>([]);

    const [selectedPallet, setSelectedPallet] =
        useState<{
            id: number;
            number: string;
        } | null>(null);

    const openPallet = async (
        palletId: number,
        palletNumber: string
    ) => {

        const data = await getPalletItems(palletId);

        setPalletItems(data);

        setSelectedPallet({
            id: palletId,
            number: palletNumber
        });
    }

    return(
        <div
            className="modal-backdrop-custom"
            onClick={onClose}
        >
            <div
                className="modal-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">

                    <div className="modal-header">

                        <h5>
                            Zasilka {shipment.shipmentNumber}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <strong>Cislo objednavky:</strong>{" "}
                            {shipment.orderNumber}
                        </div>

                        <div className="mb-3">
                            <strong>Stav:</strong>{" "}
                            {shipment.statusCode}
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Paleta</th>
                                    <th>Uzavrena</th>
                                    <th>Stav</th>
                                </tr>
                            </thead>

                            <tbody>
                            {shipment.pallets.map((pallet) => (

                                <tr key={pallet.palletId}>
                                    <td>
                                        <button
                                            className="btn btn-link"
                                            onClick={() =>
                                                openPallet(
                                                    pallet.palletId,
                                                    pallet.palletNumber
                                                )
                                            }
                                        >
                                            {pallet.palletNumber}
                                        </button>
                                    </td>
                                    <td>
                                        {pallet.palletClosed
                                            ? "Ano"
                                            : "Ne"
                                        }
                                    </td>
                                    <td>{pallet.statusCode}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedPallet && (
                <PalletModal
                    palletNumber={selectedPallet.number}
                    items={palletItems}
                    onClose={() => setSelectedPallet(null)}
                />
            )}
        </div>
    )
}