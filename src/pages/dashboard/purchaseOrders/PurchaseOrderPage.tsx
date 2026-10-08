import {useEffect, useState} from "react";
import type {PurchaseOrder, PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";
import {deletePurchaseOrder, getPurchaseOrderDetail, getPurchaseOrders} from "../../../api/PurchaseOrderApi.ts";
import PurchaseOrderModal from "../../../components/purchaseOrders/PurchaseOrderModal.tsx";
import PurchaseOrderCreateModal from "../../../components/purchaseOrders/PurchaseOrderCreateModal.tsx";
import ConfirmDeleteModal from "../../../components/layout/ConfirmDeleteModal.tsx";

export default function PurchaseOrderPage(){
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([])
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrderDetail | null>(null)
    const [selectedPurchaseOrderId, setSelectedPurchaseOrderId] = useState<number | null>(null)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("")
    const [supplierName, setSupplierName] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const [statusCode, setStatusCode] = useState("")

    const [purchaseOrderToDelete, setPurchaseOrderToDelete] = useState<PurchaseOrder | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")


    const fetchPurchaseOrders = async () => {
        const data = await getPurchaseOrders(
            purchaseOrderNumber,
            supplierName,
            employeeName,
            statusCode
        )

        setPurchaseOrders(data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPurchaseOrders();
            setPurchaseOrders(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () => {
        await fetchPurchaseOrders()
    }

    const openPurchaseOrder = async (purchaseOrder: PurchaseOrder) => {
        const data = await getPurchaseOrderDetail(purchaseOrder.id)
        setSelectedPurchaseOrder(data)
        setSelectedPurchaseOrderId(purchaseOrder.id)
    }

    const openDeleteModal = (purchaseOrder: PurchaseOrder) => {
        setDeleteError("")
        setPurchaseOrderToDelete(purchaseOrder)
    }

    const handleDelete = async() => {
        if(!purchaseOrderToDelete){
            return
        }

        try {
            setDeleting(true)
            setDeleteError("")

            await deletePurchaseOrder(purchaseOrderToDelete.id)
            setPurchaseOrderToDelete(null)

            await fetchPurchaseOrders()
        }catch {
            setDeleteError("Nakupni objednavku se nepodarilo smazat")
        }finally {
            setDeleting(false)
        }
    }

    return(
        <div className="container-fluid">
            <div className="d=flex justify-content-between align-items-center mb-4">
                <h1>Nakupni objednavky</h1>

                <button
                    className="btn btn-success"
                    onClick={() => setShowCreateModal(true)}
                >
                    Pridat nakupni objednavku
                </button>
            </div>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Cislo nakupni objednavky"
                        value={purchaseOrderNumber}
                        onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Nazev dodavatele"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
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
                <div className="col-md-2">
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
                    <th>Cislo nakupni objednavky</th>
                    <th>Nazev dodavatele</th>
                    <th>Datum vytvoreni</th>
                    <th>Jmeno zamestnance</th>
                    <th>Stav</th>
                </tr>
                </thead>

                <tbody>
                {purchaseOrders.map(purchaseOrder => (
                    <tr key={purchaseOrder.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openPurchaseOrder(purchaseOrder)}
                            >
                                {purchaseOrder.purchaseOrderNumber}
                            </button>

                            {(purchaseOrder.statusCode === "ENTERED" || purchaseOrder.statusCode === "BLOCKED") && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => openDeleteModal(purchaseOrder)}
                                >
                                    🗑 Smazat
                                </button>
                            )}
                        </td>
                        <td>{purchaseOrder.supplierName}</td>
                        <td>{purchaseOrder.createdAt.replace("T", " ").substring(0,19)}</td>
                        <td>{purchaseOrder.employeeName}</td>
                        <td>{purchaseOrder.statusCode}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedPurchaseOrder && (
                <PurchaseOrderModal
                    purchasedOrderId={selectedPurchaseOrderId!}
                    purchaseOrder={selectedPurchaseOrder}
                    onClose={() => {
                        setSelectedPurchaseOrder(null);
                        setSelectedPurchaseOrderId(null);
                    }}
                    onSaved={async () => {
                        if(selectedPurchaseOrderId === null){
                            return
                        }
                        const data = await getPurchaseOrderDetail(
                            selectedPurchaseOrderId
                        )
                        setSelectedPurchaseOrder(data)

                        await fetchPurchaseOrders()
                    }}
                />
            )}

            {showCreateModal && (
                <PurchaseOrderCreateModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSaved={fetchPurchaseOrders}
                />
            )}

            {purchaseOrderToDelete && (
                <ConfirmDeleteModal
                    show={purchaseOrderToDelete !== null}
                    title="Odstranit nakupni objednavku"
                    description="Opravdu chcete odstranit nakupni objednavku vcetne vsech jejich polozek?"
                    itemName={purchaseOrderToDelete?.purchaseOrderNumber ?? ""}
                    loading={deleting}
                    error={deleteError}
                    onClose={() => setPurchaseOrderToDelete(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}