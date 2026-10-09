import {useEffect, useState} from "react";
import type {PurchaseOrderStatusHistory} from "../../../types/event.ts";
import {getPurchaseOrderStatusHistories} from "../../../api/PurchaseOrderStatusHistory.ts";

export default function PurchaseOrderStatusHistoryPage(){
    const [statusHistories, setStatusHistories] = useState<PurchaseOrderStatusHistory[]>([])

    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("")
    const [employeeName, setEmployeeName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPurchaseOrderStatusHistories()
            setStatusHistories(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () => {
        const data = await getPurchaseOrderStatusHistories(
            purchaseOrderNumber,
            employeeName
        )
        setStatusHistories(data)
    }

    return(
        <div className="container-fluid">
            <h1>Zmeny stavu nakupni objednavky</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Cislo objednavky"
                        value={purchaseOrderNumber}
                        onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Jmeno zamestnance"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
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
                    <th>Cislo nakupni objednavky</th>
                    <th>Puvodni status</th>
                    <th>Novy status</th>
                    <th>Datum zmeny</th>
                    <th>Jmeno zamestnance</th>
                    <th>Poznamka</th>
                </tr>
                </thead>

                <tbody>
                {statusHistories.map(statusHistory => (
                    <tr key={statusHistory.id}>
                        <td>{statusHistory.purchaseOrderNumber}</td>
                        <td>{statusHistory.oldStatusCode ?? "-"}</td>
                        <td>{statusHistory.newStatusCode}</td>
                        <td>{statusHistory.changedAt.replace("T", " ").substring(0,19)}</td>
                        <td>{statusHistory.employeeName ?? "SYSTEM"}</td>
                        <td>{statusHistory.note}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}