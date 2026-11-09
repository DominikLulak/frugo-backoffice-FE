import "../modal.css";

import useProducts from "../../hooks/products/useProducts.ts";
import useOrderCreateForm from "../../hooks/orders/modal/useOrderCreateForm.ts";

import BaseModal from "../common/modal/BaseModal.tsx";
import ModalActions from "../common/modal/ModalActions.tsx";
import FormSection from "../common/form/FormSection.tsx";
import FormField from "../common/form/FormField.tsx";

type Props = {
    show: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
};

export default function OrderCreateModal({
                                             show,
                                             onClose,
                                             onSaved,
                                         }: Props) {
    const {
        products,
        loadingProducts,
        loadProductsError,
    } = useProducts({ enabled: show });

    const form = useOrderCreateForm({
        show,
        products,
        onClose,
        onSaved,
    });

    if (!show) {
        return null;
    }

    const loadingData =
        form.loadingCustomers || loadingProducts;

    const dataError =
        form.customerError || loadProductsError;

    return (
        <BaseModal
            title="Vytvořit novou objednávku"
            onClose={onClose}
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={form.handleSubmit}
                    cancelText="Zrušit"
                    submitText="Vytvořit"
                    loadingText="Vytvářím..."
                    isLoading={form.loading}
                    submitDisabled={loadingData || !!dataError}
                />
            }
        >
            {dataError && (
                <div className="alert alert-danger">
                    {dataError}
                </div>
            )}

            {form.error && (
                <div className="alert alert-danger">
                    {form.error}
                </div>
            )}

            {loadingData && (
                <div className="text-center mb-3">
                    <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Načítám...
                        </span>
                    </div>

                    <span className="ms-2">
                        Načítám data...
                    </span>
                </div>
            )}

            {!loadingData && !dataError && (
                <>
                    <FormSection>
                        <FormField label="Zákazník">
                            <select
                                className="form-select"
                                value={form.customerId ?? ""}
                                onChange={event =>
                                    form.setCustomerId(
                                        event.target.value
                                            ? Number(event.target.value)
                                            : null,
                                    )
                                }
                                disabled={form.loading}
                            >
                                <option value="">
                                    Vyberte zákazníka
                                </option>

                                {form.customers.map(customer => (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                    </FormSection>

                    <hr />

                    <h6 className="mb-3">Produkty objednávky</h6>

                    {form.items.map((item, index) => {
                        const productTypes =
                            form.getProductTypes(item.category);

                        const availableProducts =
                            form.getProductsForItem(
                                item.category,
                                item.productType,
                            );

                        return (
                            <div
                                key={index}
                                className="border rounded p-3 mb-3"
                            >
                                <div className="d-flex justify-content-between mb-3">
                                    <strong>
                                        Produkt {index + 1}
                                    </strong>

                                    {form.items.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => form.removeItem(index)}
                                            disabled={form.loading}
                                        >
                                            Odebrat
                                        </button>
                                    )}
                                </div>

                                <FormSection>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <FormField label="Kategorie">
                                                <select
                                                    className="form-select"
                                                    value={item.category}
                                                    onChange={event =>
                                                        form.handleCategoryChange(
                                                            index,
                                                            event.target.value,
                                                        )
                                                    }
                                                    disabled={form.loading}
                                                >
                                                    <option value="">
                                                        Vyberte kategorii
                                                    </option>

                                                    {form.categories.map(category => (
                                                        <option
                                                            key={category}
                                                            value={category}
                                                        >
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormField>
                                        </div>

                                        <div className="col-md-4">
                                            <FormField label="Druh produktu">
                                                <select
                                                    className="form-select"
                                                    value={item.productType}
                                                    onChange={event =>
                                                        form.handleProductTypeChange(
                                                            index,
                                                            event.target.value,
                                                        )
                                                    }
                                                    disabled={
                                                        form.loading ||
                                                        !item.category
                                                    }
                                                >
                                                    <option value="">
                                                        Vyberte druh
                                                    </option>

                                                    {productTypes.map(type => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormField>
                                        </div>

                                        <div className="col-md-4">
                                            <FormField label="Produkt">
                                                <select
                                                    className="form-select"
                                                    value={item.productId ?? ""}
                                                    onChange={event =>
                                                        form.updateItem(index, {
                                                            productId: event.target.value
                                                                ? Number(event.target.value)
                                                                : null,
                                                        })
                                                    }
                                                    disabled={
                                                        form.loading ||
                                                        !item.productType
                                                    }
                                                >
                                                    <option value="">
                                                        Vyberte produkt
                                                    </option>

                                                    {availableProducts.map(product => (
                                                        <option
                                                            key={product.id}
                                                            value={product.id}
                                                        >
                                                            {product.productName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormField>
                                        </div>

                                        <div className="col-md-6">
                                            <FormField label="Požadované množství">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min={1}
                                                    step={1}
                                                    value={item.quantity}
                                                    onChange={event =>
                                                        form.updateItem(index, {
                                                            quantity: Number(event.target.value),
                                                        })
                                                    }
                                                    disabled={form.loading}
                                                />
                                            </FormField>
                                        </div>
                                    </div>
                                </FormSection>
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={form.addItem}
                        disabled={form.loading}
                    >
                        <i className="bi bi-plus-lg me-1" />
                        Přidat produkt
                    </button>
                </>
            )}
        </BaseModal>
    );
}