import type {PurchaseOrderDetail} from "../../types/purchaseOrder.ts";
import {useState} from "react";
import {changePurchaseOrderStatus} from "../../api/PurchaseOrderApi.ts";

type Props = {
    purchaseOrderId: number;
    purchaseOrder: PurchaseOrderDetail;
    onClose: () => void;
    onSaved: () => void;
}

const allowedTransitions: Record<string, {code: string; label: string}[]> = {
    ENTERED: [
        {code: "BLOCKED", label: "Blokovano"},
        {code: "CANCELLED", label: "Zruseno"}
    ],
    BLOCKED: [
        {code: "CANCELLED", label: "Zruseno"},
        {code: "ENTERED", label: "Zadano"}
    ]
}

export default function PurchaseOrderStatusModal({
    purchaseOrderId,
    purchaseOrder,
    onClose,
    onSaved
}:Props){
    const [statusCode, setStatusCode] = useState("")
    const [note, setNote] = useState("")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const transitions = allowedTransitions[purchaseOrder.statusCode] ?? []

    const handleSave = async () => {
        if(!statusCode || !note.trim()){
            setError("Vyberte novy stav a vyplnte poznamku.")
            return
        }

        try{
            setSaving(true)
            setError("")

            await changePurchaseOrderStatus(purchaseOrderId, {
                statusCode,
                note: note.trim()
            })

            await onSaved()
            onClose()
        }catch{
            setError("Stav objednavky se nepodarilo zmenit")
        }finally {
            setSaving(false)
        }
    }

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
                        <h5 className="modal-title">
                            Zmenit stav objeddnavky
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-body">
                        <p>
                            Aktualni stav: <strong>
                            {purchaseOrder.statusCode}
                            </strong>
                        </p>

                        {transitions.length === 0 ? (
                            <div className="alert alert-info">
                                Pro tento stav neni dostupna rucni zmena
                            </div>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Novy stav
                                    </label>
                                    <select
                                        className="form-select"
                                        value={statusCode}
                                        onChange={(e) => setStatusCode(e.target.value)}
                                        disabled={saving}
                                    >
                                        <option value="">
                                            Vyber stav
                                        </option>

                                        {transitions.map((transition) => (
                                            <option
                                                key={transition.code}
                                                value={transition.code}
                                            >
                                                {transition.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Duvod zmeny
                                    </label>

                                    <textarea
                                        className="form-control"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        rows={3}
                                        maxLength={2000}
                                        placeholder="Uvedte duvod zmeny stavu..."
                                        disabled={saving}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {error && (
                            <div
                                className="alert alert-danger"
                            >
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

                        {transitions.length > 0 && (
                            <button
                                type="button"
                                className="btn btn-primary m-lg-1"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Ukladam..." : "Ulozit"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}