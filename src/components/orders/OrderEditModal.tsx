import useOrderEditForm from "../../hooks/orders/modal/useOrderEditForm.ts";
import type {OrderDetail} from "../../types/order.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import ModalActions from "../common/modal/ModalActions.tsx";
import FormSection from "../common/form/FormSection.tsx";
import FormField from "../common/form/FormField.tsx";

type Props = {
    show: boolean;
    order: OrderDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
};

export default function OrderEditModal({
                                           show,
                                           order,
                                           onClose,
                                           onSaved,
                                       }: Props) {
    const form = useOrderEditForm({
        show,
        order,
        onClose,
        onSaved,
    });

    if (!show) return null;

    return (
        <BaseModal
            title={`Upravit objednávku ${order.orderNumber}`}
            onClose={onClose}
            level={2}
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={form.handleSave}
                    cancelText="Zrušit"
                    submitText="Uložit"
                    loadingText="Ukládám..."
                    isLoading={form.saving}
                    submitDisabled={
                        form.loadingCustomers ||
                        !!form.customersError
                    }
                />
            }
        >
            {(form.error || form.customersError) && (
                <div className="alert alert-danger">
                    {form.error || form.customersError}
                </div>
            )}

            <FormSection>
                <FormField label="Číslo objednávky">
                    <input
                        type="text"
                        className="form-control"
                        value={order.orderNumber}
                        disabled
                        readOnly
                    />
                </FormField>

                <FormField label="Zákazník">
                    <select
                        className="form-select"
                        value={form.customerId}
                        onChange={event =>
                            form.setCustomerId(Number(event.target.value))
                        }
                        disabled={
                            form.saving ||
                            form.loadingCustomers
                        }
                    >
                        {form.customers.map(customer => (
                            <option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.name}
                            </option>
                        ))}
                    </select>

                    {form.loadingCustomers && (
                        <div className="form-text">
                            Načítám zákazníky...
                        </div>
                    )}
                </FormField>
            </FormSection>
        </BaseModal>
    );
}