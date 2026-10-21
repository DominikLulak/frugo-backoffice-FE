import type {PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";
import usePurchaseOrderStatusForm from "../../../hooks/purchaseOrder/modal/usePurchaseOrderStatusForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    purchaseOrderId: number;
    purchaseOrder: PurchaseOrderDetail;
    onClose: () => void;
    onSaved: () => void;
}

export default function PurchaseOrderStatusModal({
    purchaseOrderId,
    purchaseOrder,
    onClose,
    onSaved
}:Props){
    const {
        statusCode, setStatusCode, note, setNote,
        saving, error, transitions, handleSave
    } = usePurchaseOrderStatusForm({purchaseOrderId, purchaseOrder, onClose, onSaved})

    return(
        <>
            <BaseModal
                title={`Zmenit stav obejdanvky ${purchaseOrder.purchaseOrderNumber}`}
                onClose={onClose}
                secondLevel
                footer={
                    transitions.length > 0 ? (
                        <ModalActions
                            onCancel={onClose}
                            onSubmit={handleSave}
                            cancelText="Zrusit"
                            submitText="Ulozit"
                            loadingText="Ukladam..."
                            isLoading={saving}
                        />
                    ) : (
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={saving}
                            >
                                Zrušit
                            </button>
                        </div>
                    )
                }
            >
                <FormSection>
                    <FormField label="Aktivni stav">
                        <input
                            type="text"
                            className="form-control"
                            value={purchaseOrder.statusCode}
                            disabled
                            readOnly
                        />
                    </FormField>

                    {transitions.length === 0 ? (
                        <div className="alert alert-info">
                            Pro tento stav neni dostupna rucni zmena.
                        </div>
                    ) : (
                        <>
                            <FormField label="Novy stav">
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
                            </FormField>

                            <FormField label="Duvod zmeny">
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
                            </FormField>
                        </>
                    )}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                </FormSection>
            </BaseModal>
        </>
    )
}