import useCountries from "../../../hooks/useCountries.ts";
import useProducts from "../../../hooks/products/useProducts.ts";
import usePurchaseOrderItemAddForm from "../../../hooks/purchaseOrder/modal/usePurchaseOrderItemAddForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    purchaseOrderId: number;
    onClose: () => void;
    onSaved: () => void;
}

export default function PurchaseOrderItemAddModal({
    show,
    purchaseOrderId,
    onClose,
    onSaved
}:Props){
    const {countries, loadingCountries, countriesError} = useCountries()
    const {products, loadingProducts, loadProductsError} = useProducts()

    const form = usePurchaseOrderItemAddForm({
        show, purchaseOrderId, products,onClose, onSaved
    })

    if(!show){
        return null
    }

    const loadingData = loadingCountries || loadingProducts;
    const dataError = countriesError || loadProductsError;

    return(
        <>
            <BaseModal
                title={`Pridat polozku objednavky`}
                onClose={onClose}
                secondLevel
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

                {!loadingData && !dataError && (
                    <FormSection>
                        <FormField label="Kategorie">
                            <select
                                className="form-select"
                                value={form.category}
                                onChange={(e) => form.handleCategoryChange(e.target.value)}
                                disabled={form.loading}
                            >
                                <option value="">Vyberte kategorii</option>
                                {form.categories.map((category) => (
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
                                onChange={(e) => form.handleProductTypeChange(e.target.value)}
                                disabled={!form.category || form.loading}
                            >
                                <option value="">Vyberte druh</option>
                                {form.productTypes.map((type) => (
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
                                onChange={(e) => form.setProductId(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )}
                                disabled={!form.productType || form.loading}
                            >
                                <option value="">Vyberte produkt</option>
                                {form.filteredProducts.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.productName}
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Zeme puvodu">
                            <select
                                className="form-select"
                                value={form.countryId ?? ""}
                                onChange={(e) => form.setCountryId(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )}
                                disabled={form.loading}
                            >
                                <option value="">Vyberte zemi puvodu</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Mnozstvi">
                            <input
                                type="number"
                                className="form-control"
                                min={1}
                                step={1}
                                value={form.quantity}
                                onChange={(e) => form.setQuantity(
                                    e.target.value === ""
                                        ? 0
                                        : Number(e.target.value)
                                )}
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
        </>
    )
}