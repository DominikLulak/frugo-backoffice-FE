import {useEffect, useState} from "react";
import {getShipments} from "../../../api/ShipmentsApi.ts";

export default function ShipmentsPage(){

    const [shipments, setShipments] = useState<any[]>([])

    const [shipmentNumber, setShipmentNumber] = useState("")
    const [orderNumber, setOrderNumber] = useState("")
    const [status, setStatus] = useState("")
    const [customerName, setCustomerName] = useState("")

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
            status,
            customerName
        );
        setShipments(data);
    }

    return(
        <div className="container-fluid">
            <h1>Zasilky</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Cislo zasilky"
                        value={shipmentNumber}
                        onChange={(e) => setShipmentNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Cislo objednavky"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Vše</option>
                        <option value="ZADÁNO">ZADÁNO</option>
                        <option value="UVOLNĚNO">UVOLNĚNO</option>
                        <option value="DOKONČENO">DOKONČENO</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Nazev zakaznika"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>

                <div className="col-md-1 d-grid">
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
                    <th>Cislo zasilky</th>
                    <th>Cislo objednavky</th>
                    <th>Stav</th>
                    <th>Zakaznik</th>
                </tr>
                </thead>

                <tbody>
                {shipments.map((shipment, i) => (
                    <tr key={i}>
                        <td>{shipment.shipmentNumber}</td>
                        <td>{shipment.orderNumber}</td>
                        <td>{shipment.status}</td>
                        <td>{shipment.customerName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}