import type {PurchaseOrderDetail} from "../../types/purchaseOrder.ts";

type Props = {
    purchaseOrder: PurchaseOrderDetail;
    onClose: () => void;
}

export default function PurchaseOrderModal({
    purchaseOrder,
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
                        <h5>Nakupni objednavka {purchaseOrder.purchaseOrderNumber}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Udaje nakupni objednavky</h6>

                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>Nazev dodavatele</th>
                                    <td>{purchaseOrder.supplierName}</td>
                                </tr>
                                <tr>
                                    <th>Interni kod dodavatele</th>
                                    <td>{purchaseOrder.supplierInternalCode}</td>
                                </tr>
                                <tr>
                                    <th>Vytvoreno</th>
                                    <td>{purchaseOrder.createdAt}</td>
                                </tr>
                                <tr>
                                    <th>Jmeno zamestnance</th>
                                    <td>{purchaseOrder.employeeName}</td>
                                </tr>
                                <tr>
                                    <th>Stav</th>
                                    <td>{purchaseOrder.statusCode}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Polozky nakupni objednavky</h6>

                        {purchaseOrder.items.length === 0 ? (
                            <p>Zadne polozky</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Kategorie</th>
                                    <th>Typ</th>
                                    <th>Nazev</th>
                                    <th>Zeme puvodu</th>
                                    <th>Mnozstvi</th>
                                    <th>Prijate mnozstvi</th>
                                    <th>Stav</th>
                                </tr>
                                </thead>

                                <tbody>
                                {purchaseOrder.items.map((item) => (
                                    <tr>
                                        <td>{item.categoryCode}</td>
                                        <td>{item.productType}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.countryCode}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.receivedQuantity}</td>
                                        <td>{item.statusCode}</td>
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