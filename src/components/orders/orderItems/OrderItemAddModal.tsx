import useProducts from "../../../hooks/products/useProducts.ts";
import useOrderItemAddForm from "../../../hooks/orders/modal/items/useOrderItemAddForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    orderId: number;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function OrderItemAddModal({
    show, orderId, onClose, onSaved
}:Props){
    const {
        products, loadProductsError, loadingProducts
    } = useProducts({enabled: show})

    const form = useOrderItemAddForm({
        show, orderId, onClose, onSaved, products
    })

    if(!show) return null

    const loadingData = loadingProducts
    const dataError = loadProductsError

    return (
        <BaseModal
            title="Pridat produkt do objednavky"
            onClose={onClose}
            level={2}
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={form.handleSubmit}
                    cancelText="Zrusit"
                    submitText="Pridat"
                    loadingText="Pridavam..."
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

            {loadingData && (
                <div className="text-center mb-3">
                    <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                    />
                    <span className="ms-2">
                        Nacitam produkty
                    </span>
                </div>
            )}

            {!loadingData && !dataError && (
                <FormSection>
                    <FormField label="Kategorie">
                        <select
                            className="form-select"
                            value={form.category}
                            onChange={e =>
                                form.handleCategoryChange(e.target.value)
                            }
                            disabled={form.loading}
                        >
                            <option value="">Vyberte kategorii</option>
                            {form.categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="Druh">
                        <select
                            className="form-select"
                            value={form.productType}
                            onChange={e =>
                                form.handleProductTypeChange(e.target.value)
                            }
                            disabled={!form.category || form.loading}
                        >
                            <option value="">Vyberte druh</option>
                            {form.productTypes.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="Produkt">
                        <select
                            className="form-select"
                            value={form.productId ?? ""}
                            onChange={e =>
                                form.setProductId(e.target.value ? Number(e.target.value) : null)
                            }
                            disabled={!form.productType || form.loading}
                        >
                            <option value="">Vyberte produkt</option>
                            {form.filteredProducts.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="Mnozstvi (kg)">
                        <input
                            type="number"
                            className="form-control"
                            min={1}
                            step={1}
                            value={form.quantity}
                            onChange={e => form.setQuantity(Number(e.target.value))}
                            disabled={form.loading}
                        />
                    </FormField>
                </FormSection>
            )}

            {form.error && (
                <div className="alert alert-danger mt-3">
                    {form.error}
                </div>
            )}
        </BaseModal>
    )
}