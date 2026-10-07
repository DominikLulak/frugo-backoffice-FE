import {useEffect, useState} from "react";
import {getShipmentDetail, getShipments} from "../../../api/ShipmentsApi.ts";
import type {Shipment, ShipmentDetail} from "../../../types/shipment.ts";
import ShipmentModal from "../../../components/shipments/ShipmentModal.tsx";

export default function ShipmentsPage(){

    const [shipments, setShipments] = useState<Shipment[]>([])
    const [selectedShipment, setSelectedShipment] = useState<ShipmentDetail | null>(null)

    const [shipmentNumber, setShipmentNumber] = useState("")
    const [orderNumber, setOrderNumber] = useState("")
    const [statusCode, setStatusCode] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getShipments();
            setShipments(data);
        };
        fetchData();
    }, []);

    const handleFilter = async () => {
        const data = await getShipments(
            shipmentNumber,
            orderNumber,
            statusCode
        );
        setShipments(data);
    }

    const openShipment = async (shipment: Shipment) => {
        const data = await getShipmentDetail(shipment.id)

        setSelectedShipment(data)
    }

    return(
        <div className="container-fluid">
            <h1>Zásilky</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Číslo zásilky"
                        value={shipmentNumber}
                        onChange={(e) => setShipmentNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Číslo objednávky"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={statusCode}
                        onChange={(e) => setStatusCode(e.target.value)}
                    >
                        <option value="">Vse</option>
                        <option value="ENTERED">ENTERED</option>
                        <option value="RELEASED">RELEASED</option>
                        <option value="BLOCKED">BLOCKED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="FINISHED">FINISHED</option>
                    </select>
                </div>

                <div className="col-md-3 d-grid">
                    <button
                        className="btn btn-primary"
                        onClick={handleFilter}
                    >
                        Filtrovat
                    </button>
                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>Číslo zásilky</th>
                    <th>Číslo objednávky</th>
                    <th>Stav</th>
                </tr>
                </thead>

                <tbody>
                {shipments.map(shipment => (
                    <tr key={shipment.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openShipment(shipment)}
                            >
                                {shipment.shipmentNumber}
                            </button>
                        </td>
                        <td>{shipment.orderNumber}</td>
                        <td>{shipment.statusCode}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedShipment && (
                <ShipmentModal
                    shipment={selectedShipment}
                    onClose={() => setSelectedShipment(null)}
                />
            )}
        </div>
    )
}