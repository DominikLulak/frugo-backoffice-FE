import type {StockMovementDetail} from "../../types/event.ts";

type Props = {
    stockMovement: StockMovementDetail;
    onClose: () => void;
}

export default function StockMovementModal({
    stockMovement,
    onClose
}:Props){
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
                        <h5>Detail skladového pohybu</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <table className="table table-sm mt-4">
                            <tbody>
                            <tr>
                                <th>Datum vytvoreni</th>
                                <td>{stockMovement.createdAt}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Udalost</h6>
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Kod udalost</th>
                                <th>Nazev udalosti</th>
                                <th>Popis udalosti</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>{stockMovement.eventCode}</td>
                                <td>{stockMovement.eventName}</td>
                                <td>{stockMovement.eventDescription}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Skladova polozka</h6>
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Cislo ETI</th>
                                <th>Cislo noveho ETI</th>
                                <th>Mnozstvi</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>{stockMovement.etiNumber}</td>
                                <td>{stockMovement.newEtiNumber ?? "-"}</td>
                                <td>{stockMovement.quantity}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Pohyb</h6>
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Z lokace</th>
                                <th>Na lokaci</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>{stockMovement.fromLocation ?? "-"}</td>
                                <td>{stockMovement.toLocation ?? "-"}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Souvisejici zaznamy</h6>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>Cislo zamestnance</th>
                                <td>{stockMovement.employeeNumber}</td>
                            </tr>
                            <tr>
                                <th>Jmeno zamestnance</th>
                                <td>{stockMovement.employeeName}</td>
                            </tr>
                            <tr>
                                <th>Cislo palety</th>
                                <td>{stockMovement.palletNumber ?? "-"}</td>
                            </tr>
                            <tr>
                                <th>Cislo objednavky</th>
                                <td>{stockMovement.orderNumber ?? "-"}</td>
                            </tr>
                            <tr>
                                <th>Cislo zasilky</th>
                                <td>{stockMovement.shipmentNumber ?? "-"}</td>
                            </tr>
                            <tr>
                                <th>Cislo nakupni objednavky</th>
                                <td>{stockMovement.purchaseOrderNumber ?? "-"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}