import type {PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";
import usePurchaseOrderEditForm from "../../../hooks/purchaseOrder/modal/usePurchaseOrderEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

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
    const {
        suppliers, loadingSuppliers, suppliersError, supplierId, setSupplierId,
        saving, error, handleSave
    } = usePurchaseOrderEditForm({show, purchaseOrderId, purchaseOrder, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={`Upravit nakupni objednavku ${purchaseOrder.purchaseOrderNumber}`}
                onClose={onClose}
                secondLevel
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText="Ulozit"
                        loadingText="Ukladam..."
                        isLoading={saving}
                        submitDisabled={loadingSuppliers || !!error}
                    />
                }
            >
                {(error || suppliersError) && (
                    <div className="alert alert-danger">
                        {error || suppliersError}
                    </div>
                )}

                <FormSection>
                    <FormField label="Dodavatel">
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

                        {loadingSuppliers && (
                            <div className="form-text">
                                Nacitam dodavatele...
                            </div>
                        )}
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}