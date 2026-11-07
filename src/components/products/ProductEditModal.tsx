import type {Product} from "../../types/product.ts";
import useProductEditForm from "../../hooks/products/productsPage/modal/useProductEditForm.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import ModalActions from "../common/modal/ModalActions.tsx";
import FormSection from "../common/form/FormSection.tsx";
import FormField from "../common/form/FormField.tsx";

type Props = {
    show: boolean;
    product: Product | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function ProductEditModal({
    show, product, onSaved, onClose
}:Props){
    const {
        categories, productTypes,
        categoryId, setCategoryId, productTypeName, setProductTypeName,
        productCode, setProductCode, name, setName, pricePerUnit, setPricePerUnit,
        shelfLifeDays, setShelfLifeDays, reorderPoint, setReorderPoint, minimumStock, setMinimumStock,
        loadingCategories, loadingProductTypes, loadError,
        saving, errors, saveError, isEditing, handleSave
    } = useProductEditForm({product, show, onSaved, onClose})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit produkt" : "Vytvorit produkt"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Vytvorit produkt"}
                        loadingText="Ukladam..."
                        isLoading={saving}
                    />
                }
            >
                {saveError && (
                    <div className="alert alert-danger">
                        {saveError}
                    </div>
                )}

                {loadError && (
                    <div className="alert alert-danger">
                        {loadError}
                    </div>
                )}

                <FormSection>

                    <FormField label="Kategorie">
                        <select
                            className={`form-select ${errors.categoryId ? "is-invalid" : ""}`}
                            value={categoryId}
                            onChange={(e) => setCategoryId(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )}
                            disabled={loadingCategories}
                        >
                            <option value="">
                                {loadingCategories ? "Nacitam kategorie..." : "Vyberte kategorii"}
                            </option>

                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {errors.categoryId && (
                            <div className="invalid-feedback">
                                {errors.categoryId}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Typ produktu">
                        <input
                            type="text"
                            list="product-types"
                            className={`form-control ${errors.productTypeName ? "is-invalid" : ""}`}
                            value={productTypeName}
                            onChange={(e) => setProductTypeName(e.target.value)}
                            placeholder={
                                categoryId === ""
                                    ? "Nejprve vyberte kategorii"
                                    : loadingProductTypes
                                        ? "Nacitam druhy..."
                                        : "Vyberte nebo zadejte novy typ"
                            }
                            disabled={categoryId === "" || loadingCategories}
                        />

                        <datalist id="product-types">
                            {productTypes.map(type => (
                                <option key={type.id} value={type.name}/>
                            ))}
                        </datalist>

                        {errors.productTypeName && (
                            <div className="invalid-feedback">
                                {errors.productTypeName}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Kod produktu">
                        <input
                            type="text"
                            className={`form-control ${errors.productCode ? "is-invalid" : ""}`}
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                        />

                        {errors.productCode && (
                            <div className="invalid-feedback">
                                {errors.productCode}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Nazev produktu">
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Cena za kg">
                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            className={`form-control ${errors.pricePerUnit ? "is-invalid" : ""}`}
                            value={pricePerUnit}
                            onChange={(e) => setPricePerUnit(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )}
                        />

                        {errors.pricePerUnit && (
                            <div className="invalid-feedback">
                                {errors.pricePerUnit}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Trvanlivost (dny)">
                        <input
                            type="number"
                            min="1"
                            className={`form-control ${errors.shelfLifeDays ? "is-invalid" : ""}`}
                            value={shelfLifeDays}
                            onChange={(e) => setShelfLifeDays(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )}
                        />

                        {errors.shelfLifeDays && (
                            <div className="invalid-feedback">
                                {errors.shelfLifeDays}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Bod objedani (kg)">
                        <input
                            type="number"
                            min="0"
                            className={`form-control ${errors.reorderPoint ? "is-invalid" : ""}`}
                            value={reorderPoint}
                            onChange={(e) => setReorderPoint(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )}
                        />

                        {errors.reorderPoint && (
                            <div className="invalid-feedback">
                                {errors.reorderPoint}
                            </div>
                        )}
                    </FormField>

                    <FormField label="Minimalni zasoba (kg)">
                        <input
                            type="number"
                            min="0"
                            className={`form-control ${errors.minimumStock ? "is-invalid" : ""}`}
                            value={minimumStock}
                            onChange={(e) => setMinimumStock(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )}
                        />

                        {errors.minimumStock && (
                            <div className="invalid-feedback">
                                {errors.minimumStock}
                            </div>
                        )}
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}