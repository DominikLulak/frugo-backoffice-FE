import usePurchaseOrderCreateForm from "../../../hooks/purchaseOrder/modal/usePurchaseOrderCreateForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type PurchaseOrderCreateModalProps = {
    show: boolean;
    onClose: () => void;
    onSaved: () => void;
}

export default function PurchaseOrderCreateModal({
    show,
    onClose,
    onSaved
}:PurchaseOrderCreateModalProps){
    const form = usePurchaseOrderCreateForm({
        show, onClose, onSaved
    });

    if(!show){
        return null;
    }

    const loadingData =
        form.loadingSuppliers ||
        form.loadingCountries ||
        form.loadingProducts

    const dataError =
        form.suppliersError ||
        form.countriesError ||
        form.loadProductsError

    return (
        <>
            <BaseModal
                title="Nova nakupni objednavka"
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={form.handleSubmit}
                        cancelText="Zrusit"
                        submitText="Vytvorit"
                        loadingText="Vytvarim..."
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
                    <div className="aler alert-danger">
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
                                Nacitam...
                            </span>
                        </div>
                        <span className="ms-2">
                            Nacitam data...
                        </span>
                    </div>
                )}

                {!loadingData && !dataError &&(
                    <>
                        <FormSection>
                            <FormField label="Dodavatel">
                                <select
                                    className="form-select"
                                    value={form.supplierId ?? ""}
                                    onChange={event =>
                                        form.setSupplierId(
                                            event.target.value
                                                ? Number(event.target.value)
                                                : null
                                        )
                                    }
                                    disabled={form.loading}
                                >
                                    <option value="">
                                        Vyberte dodavatele
                                    </option>

                                    {form.suppliers.map(supplier => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.name}(
                                            {supplier.internalCode}
                                            )
                                        </option>
                                    ))}
                                </select>
                            </FormField>
                        </FormSection>

                        <hr/>

                        <h6 className="mb-3">Polozky objednavky</h6>

                        {form.items.map((item, index) => {
                            const productTypes = form.getProductTypes(item.category)

                            const availableProducts = form.getProductsForItem(
                                item.category,
                                item.productType
                            )

                            return(
                                <div
                                    key={index}
                                    className="border rounded p-3 mb-3"
                                >
                                    <div className="d-flex justify-content-between mb-3">
                                        <strong>
                                            Polozka {index + 1}
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
                                                        onChange={event => form.handleCategoryChange(index, event.target.value)}
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
                                                        onChange={event => form.handleProductTypeChange(index, event.target.value)}
                                                        disabled={form.loading || !item.category}
                                                    >
                                                        <option value="">Vyberte typ produktu</option>

                                                        {productTypes.map(productType => (
                                                            <option
                                                                key={productType}
                                                                value={productType}
                                                            >
                                                                {productType}
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
                                                        onChange={event => form.updateItem(index, {productId: event.target.value ? Number(event.target.value) : null})}
                                                        disabled={form.loading || !item.productType}
                                                    >
                                                        <option value="">Vyberte produkt</option>

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
                                                <FormField label="Mnozstvi">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        min={1}
                                                        value={item.quantity}
                                                        onChange={event => form.updateItem(index, {quantity: Number(event.target.value)})}
                                                        disabled={form.loading}
                                                    />
                                                </FormField>
                                            </div>

                                            <div className="col-md-6">
                                                <FormField label="Zeme puvodu">
                                                    <select
                                                        className="form-select"
                                                        value={item.countryId ?? ""}
                                                        onChange={event => form.updateItem(index, {countryId: event.target.value ? Number(event.target.value) : null})}
                                                        disabled={form.loading}
                                                    >
                                                        <option value="">Vyberte zemi</option>
                                                        {form.countries.map(country => (
                                                            <option
                                                                key={country.id}
                                                                value={country.id}
                                                            >
                                                                {country.name}(
                                                                {country.code}
                                                                )
                                                            </option>
                                                        ))}
                                                    </select>
                                                </FormField>
                                            </div>
                                        </div>
                                    </FormSection>
                                </div>
                            )
                        })}

                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={form.addItem}
                            disabled={form.loading}
                        >
                            Pridat polozku
                        </button>
                    </>
                )}
            </BaseModal>
        </>
    )
}