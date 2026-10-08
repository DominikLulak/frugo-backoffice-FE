import type {PurchaseOrderDetail} from "../../types/purchaseOrder.ts";
import {useEffect, useState} from "react";
import type {Supplier} from "../../types/supplier.ts";
import {getSuppliers} from "../../api/SupplierApi.ts";
import {updatePurchaseOrder} from "../../api/PurchaseOrderApi.ts";

type Props = {
    show: boolean;
    purchaseOrderId: number;
    purchaseOrder: PurchaseOrderDetail;
    onClose: () => void;
    onSaved: () => void;
}

export default function PurchaseOrderEditModal({
    show,
    purchaseOrderId,
    purchaseOrder,
    onClose,
    onSaved
}:Props){
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [supplierId, setSupplierId] = useState<number>(purchaseOrder.supplierId)

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!show){
            return
        }

        setSupplierId(purchaseOrder.supplierId)
        setError("")

        const loadSuppliers = async () => {
            try {
                const data = await getSuppliers()

                setSuppliers(
                    data.filter((supplier) => supplier.active)
                )
            }catch {
                setError("Nepodarilo se nacist dodavatele")
            }
        }

        loadSuppliers()
    }, [show, purchaseOrder]);

    const handleSave = async () => {
        try {
            setSaving(true)
            setError("")

            await updatePurchaseOrder(
                purchaseOrderId,
                supplierId
            )

            onSaved()
        }catch{
            setError("Nakupni objednavku se nepodarilo upravit")
        }finally {
            setSaving(false)
        }
    }

    if(!show){
        return null
    }

    return (
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
                        <h5 className="modal-title">
                            Upravit nakupni objednavku
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <label className="form-label">
                                Dodavatel
                            </label>
                            <select
                                className="form-select"
                                value={supplierId}
                                onChange={(e) => setSupplierId(Number(e.target.value))}
                                disabled={saving}
                            >
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.name} ({supplier.internalCode})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <div className="aler alert-danger">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Zrusit
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary m-lg-1"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving
                                ? "Ukladam..."
                                : "Ulozit"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}