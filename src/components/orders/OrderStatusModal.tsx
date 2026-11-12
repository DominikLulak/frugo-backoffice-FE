import useOrderStatusForm from "../../hooks/orders/modal/useOrderStatusForm.ts";
import type {OrderDetail} from "../../types/order.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import ModalActions from "../common/modal/ModalActions.tsx";
import FormSection from "../common/form/FormSection.tsx";
import FormField from "../common/form/FormField.tsx";

type Props = {
    order: OrderDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
};

export default function OrderStatusModal({
                                             order,
                                             onClose,
                                             onSaved,
                                         }: Props) {
    const form = useOrderStatusForm({
        order,
        onClose,
        onSaved,
    });

    return (
        <BaseModal
            title={`Změnit stav objednávky ${order.orderNumber}`}
            onClose={onClose}
            level={2}
            footer={
                form.transitions.length > 0 ? (
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={form.handleSave}
                        cancelText="Zrušit"
                        submitText="Uložit"
                        loadingText="Ukládám..."
                        isLoading={form.saving}
                        submitDisabled={
                            !form.statusCode ||
                            !form.note.trim()
                        }
                    />
                ) : (
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={form.saving}
                        >
                            Zavřít
                        </button>
                    </div>
                )
            }
        >
            <FormSection>
                <FormField label="Aktuální stav">
                    <input
                        type="text"
                        className="form-control"
                        value={order.statusCode}
                        disabled
                        readOnly
                    />
                </FormField>

                {form.transitions.length === 0 ? (
                    <div className="alert alert-info">
                        Pro tento stav není dostupná ruční změna.
                    </div>
                ) : (
                    <>
                        <FormField label="Nový stav">
                            <select
                                className="form-select"
                                value={form.statusCode}
                                onChange={event =>
                                    form.setStatusCode(event.target.value)
                                }
                                disabled={form.saving}
                            >
                                <option value="">
                                    Vyberte nový stav
                                </option>

                                {form.transitions.map(transition => (
                                    <option
                                        key={transition.code}
                                        value={transition.code}
                                    >
                                        {transition.label}
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Důvod změny">
                            <textarea
                                className="form-control"
                                value={form.note}
                                onChange={event =>
                                    form.setNote(event.target.value)
                                }
                                rows={3}
                                maxLength={2000}
                                placeholder="Uveďte důvod změny stavu..."
                                disabled={form.saving}
                                required
                            />
                        </FormField>
                    </>
                )}

                {form.error && (
                    <div className="alert alert-danger">
                        {form.error}
                    </div>
                )}
            </FormSection>
        </BaseModal>
    );
}