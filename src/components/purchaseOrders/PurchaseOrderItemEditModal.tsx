import type {PurchaseOrderItem} from "../../types/purchaseOrder.ts";
import {useState} from "react";
import {updatePurchaseOrderItem} from "../../api/PurchaseOrderApi.ts";

type Props = {
    show: boolean;
    purchasedOrderId: number;
    item: PurchaseOrderItem;
    onClose: () => void;
    onSaved: () => void;
}

export default function PurchaseOrderItemEditModal({
    show,
    purchasedOrderId,
    item,
    onClose,
    onSaved
}:Props){
    const [quantity, setQuantity] = useState(item.quantity)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    if(!show){
        return null
    }

    const handleSave = async () => {
        setError("")

        if(quantity < item.receivedQuantity){
            setError("Pozadovane mnozstvi nemu byt mensi nez jit prijate mnozstvi")
            return
        }

        if(quantity < 1){
            setError("Mnozstvi musi byt alespon 1")
            return
        }

        try{
            setSaving(true)

            await updatePurchaseOrderItem(
                purchasedOrderId,
                item.id,
                quantity
            )

            onSaved();
            onClose()
        }catch {
            setError("Nepodarilo se upravit polozku objednavky")
        }finally {
            setSaving(false)
        }
    }

    return(
        <div className="modal-backdrop-custom modal-backdrop-custom-second" onClick={onClose}>
            <div className="modal-custom modal-custom-second" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content-custom">

                    <div className="modal-header">
                        <h5 className="modal-title">Upravit polozku objednavky</h5>

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
                                Kategorie
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={item.categoryCode}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Druh
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={item.productType}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Produkt
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={item.productName}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Zeme puvodu
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={item.countryCode}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Jiz prijato
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                value={item.receivedQuantity}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Pozadovane mnozstvi
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                min={Math.max(1, item.receivedQuantity)}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                disabled={saving}
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger">
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
                            className="btn btn-success m-lg-1"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Ukladam..." : "Ulozit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}