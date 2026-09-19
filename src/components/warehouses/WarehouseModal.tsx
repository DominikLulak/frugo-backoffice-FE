import "../modal.css"
import type {SectorDetail, WarehouseDetail} from "../../types/warehouse.ts";
import {useState} from "react";
import {getSectorLocations} from "../../api/WarehouseApi.ts";
import SectorDetailModal from "./SectorDetailModal.tsx";

type Props = {
    warehouse: WarehouseDetail;
    onClose: () => void;
}

export default function WarehouseModal({
    warehouse,
    onClose
}:Props){

    const [sectorDetail, setSectorDetail] = useState<SectorDetail | null>(null)

    const openSector = async (sectorId: number) => {
        const data = await getSectorLocations(sectorId)

        setSectorDetail(data)
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
                        <h5>Detail skladu {warehouse.code}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Sklad</h6>
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Kod skladu</th>
                                    <td>{warehouse.code}</td>
                                </tr>
                                <tr>
                                    <th>Nazev skladu</th>
                                    <td>{warehouse.name}</td>
                                </tr>
                                <tr>
                                    <th>Popis skladu</th>
                                    <td>{warehouse.description}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Sektory</h6>
                        {warehouse.sectors.length === 0 ? (
                            <p>Zadme polozky</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Kod sektoru</th>
                                        <th>Nazev sektoru</th>
                                        <th>Kod typu sektoru</th>
                                        <th>Nazev typu sektoru</th>
                                        <th>Popis sektoru</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {warehouse.sectors.map((sector) => (
                                    <tr key={sector.id}>
                                        <td>{sector.code}</td>
                                        <td>
                                            <button
                                                className="btn btn-link p-0"
                                                onClick={() => openSector(sector.id)}
                                            >
                                                {sector.name}
                                            </button>
                                        </td>
                                        <td>{sector.typeCode}</td>
                                        <td>{sector.typeName}</td>
                                        <td>{sector.description}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {sectorDetail && (
                <SectorDetailModal
                    sector={sectorDetail}
                    onClose={() => setSectorDetail(null)}
                />
            )}

        </div>
    )
}