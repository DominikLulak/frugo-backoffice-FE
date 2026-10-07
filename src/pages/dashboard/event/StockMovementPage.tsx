import {useEffect, useState} from "react";
import type {StockMovement, StockMovementDetail} from "../../../types/event.ts";
import {getStockMovementDetail, getStockMovements} from "../../../api/StockMovementApi.ts";
import StockMovementModal from "../../../components/event/StockMovementModal.tsx";

export default function StockMovementPage(){
    const [stockMovements, setStockMovements] = useState<StockMovement[]>([])
    const [selectedStockMovement, setSelectedStockMovement] = useState<StockMovementDetail | null>(null)

    const [eventCode, setEventCode] = useState("")
    const [etiNumber, setEtiNumber] = useState("")
    const [fromLocation, setFromLocation] = useState("")
    const [toLocation, setToLocation] = useState("")
    const [employeeNumber, setEmployeeNumber] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStockMovements()
            setStockMovements(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () =>{
        const data = await getStockMovements(
            eventCode,
            etiNumber,
            fromLocation,
            toLocation,
            employeeNumber
        )
        setStockMovements(data)
    }

    const openStockMovement = async (stockMovement: StockMovement) => {
        const data = await getStockMovementDetail(stockMovement.id)
        setSelectedStockMovement(data)
    }

    return(
        <div className="container-fluid">
            <h1>Skladove pohyby</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Kod eventu"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Cislo ETI"
                        value={etiNumber}
                        onChange={(e) => setEtiNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Z lokace"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Na lokaci"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Cislo zamestnance"
                        value={employeeNumber}
                        onChange={(e) => setEmployeeNumber(e.target.value)}
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
                        <th>Kod eventu</th>
                        <th>Cislo ETI</th>
                        <th>Vytvoreno</th>
                        <th>Pocet</th>
                        <th>Z lokace</th>
                        <th>Na lokaci</th>
                        <th>Cislo zamestnance</th>
                    </tr>
                </thead>

                <tbody>
                {stockMovements.map(stockMovement => (
                    <tr key={stockMovement.id}>
                        <td>{stockMovement.eventCode}</td>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openStockMovement(stockMovement)}
                            >
                                {stockMovement.etiNumber}
                            </button>
                        </td>
                        <td>{stockMovement.createdAt}</td>
                        <td>{stockMovement.quantity}</td>
                        <td>{stockMovement.fromLocation ?? "-"}</td>
                        <td>{stockMovement.toLocation ?? "-"}</td>
                        <td>{stockMovement.employeeNumber}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedStockMovement && (
                <StockMovementModal
                    stockMovement={selectedStockMovement}
                    onClose={() => setSelectedStockMovement(null)}
                />
            )}
        </div>
    )
}