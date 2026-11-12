import type {OrderProductRow} from "../../../hooks/orders/modal/useOrderModalTableColumns.tsx";
import useOrderItemEditForm from "../../../hooks/orders/modal/items/useOrderItemEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    orderId: number;
    product: OrderProductRow | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function OrderItemEditModal({
    show, product, orderId, onClose, onSaved
}:Props){
    const form = useOrderItemEditForm({
        show, product, orderId, onClose, onSaved
    })

    if(!show || !product) return null

    return (
        <BaseModal
            title={`Upravit produkt - ${product.productName}`}
            onClose={onClose}
            level={2}
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={form.handleSubmit}
                    cancelText="Zrusit"
                    submitText="Ulozit"
                    loadingText="Ukladam..."
                    isLoading={form.loading}
                />
            }
        >
            {form.error && (
                <div className="alert alert-danger">
                    {form.error}
                </div>
            )}

            <FormSection>
                <FormField label="Produkt">
                    <input
                        type="text"
                        className="form-control"
                        value={product.productName}
                        disabled
                    />
                </FormField>

                <FormField label="Aktualni mnozstvi (kg)">
                    <input
                        type="number"
                        className="form-control"
                        value={product.quantity}
                        disabled
                    />
                </FormField>

                <FormField label="Jiz vyskladneno (kg)">
                    <input
                        type="number"
                        className="form-control"
                        value={product.pickedQuantity}
                        disabled
                    />
                </FormField>

                <FormField label="Nove mnozstvi (kg)">
                    <input
                        type="number"
                        className="form-control"
                        min={1}
                        step={1}
                        value={form.quantity}
                        onChange={e =>
                            form.setQuantity(Number(e.target.value))
                        }
                        disabled={form.loading}
                    />
                </FormField>
            </FormSection>
        </BaseModal>
    )
}