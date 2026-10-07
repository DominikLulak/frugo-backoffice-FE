import "../modal.css"
import type {SectorDetail} from "../../types/warehouse.ts";

type Props = {
    sector: SectorDetail;
    onClose: () => void;
}

export default function SectorDetailModal({
    sector,
    onClose
}:Props){
    return(
        <div
            className="modal-backdrop-custom modal-backdrop-custom-second"
            onClick={onClose}
        >
            <div
                className="modal-custom modal-custom-second"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">
                    <div className="modal-header">
                        <h5>Sektor {sector.name}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <h6>Sektor</h6>

                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Sklad</th>
                                    <td>{sector.warehouseCode}</td>
                                </tr>
                                <tr>
                                    <th>Kod sektoru</th>
                                    <td>{sector.code}</td>
                                </tr>
                                <tr>
                                    <th>Nazev sektoru</th>
                                    <td>{sector.name}</td>
                                </tr>
                                <tr>
                                    <th>Kod typu sektoru</th>
                                    <td>{sector.typeCode}</td>
                                </tr>
                                <tr>
                                    <th>Nazev typu sektoru</th>
                                    <td>{sector.typeName}</td>
                                </tr>
                                <tr>
                                    <th>Popis sektoru</th>
                                    <td>{sector.description}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Lokace</h6>

                        {sector.locations.length === 0 ? (
                            <p>Zadne lokace</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Kod lokace</th>
                                        <th>Ulicka</th>
                                        <th>Regal</th>
                                        <th>Uroven</th>
                                        <th>Pozice</th>
                                        <th>Lze objednat</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {sector.locations.map((location) => (
                                    <tr key={location.id}>
                                        <td>{location.code}</td>
                                        <td>{location.aisle}</td>
                                        <td>{location.rack}</td>
                                        <td>{location.level}</td>
                                        <td>{location.position}</td>
                                        <td>{location.canBeOrdered ? "Ano" : "Ne"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}