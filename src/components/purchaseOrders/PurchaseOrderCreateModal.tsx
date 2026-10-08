import {useEffect, useState} from "react";
import type {Supplier} from "../../types/supplier.ts";
import type {Country} from "../../types/referenceData.ts";
import type {Product} from "../../types/product.ts";
import {getSuppliers} from "../../api/SupplierApi.ts";
import {getCountries} from "../../api/CountryApi.ts";
import {getProducts} from "../../api/ProductApi.ts";
import type {PurchaseOrderCreateDto, PurchaseOrderItemCreateDto} from "../../types/purchaseOrder.ts";
import {createPurchaseOrder} from "../../api/PurchaseOrderApi.ts";

type PurchaseOrderCreateModalProps = {
    show: boolean;
    onClose: () => void;
    onSaved: () => void;
}

type PurchaseOrderItemForm = {
    category: string;
    productType: string;
    productId: number | null;
    quantity: number;
    countryId: number | null;
}

const emptyItem = (): PurchaseOrderItemForm => ({
    category: "",
    productType: "",
    productId: null,
    quantity: 1,
    countryId: null
})

export default function PurchaseOrderCreateModal({
    show,
    onClose,
    onSaved
}:PurchaseOrderCreateModalProps){
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [countries, setCountries] = useState<Country[]>([])
    const [products, setProducts] = useState<Product[]>([])

    const [supplierId, setSupplierId] = useState<number | null>(null)
    const [items, setItems] = useState<PurchaseOrderItemForm[]>([
        emptyItem()
    ])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!show){
            return
        }

        const loadData = async () => {
            try{
                const [supplierData, countryData, productData] = await Promise.all([
                    getSuppliers("", "", true),
                    getCountries(),
                    getProducts()
                ])

                setSuppliers(supplierData)
                setCountries(countryData)
                setProducts(productData)
            } catch {
                setError("Nepodarilo se nacist data")
            }
        }

        loadData()
    }, [show]);

    const categories = [
        ...new Set(products.map(product => product.categoryCode))
    ];

    const getProductTypes = (category: string) => {
        return[
            ...new Set(
                products
                    .filter(product => product.categoryCode === category)
                    .map(product => product.productType)
            )
        ]
    }

    const getProductsForItem = (
        category: string,
        productType: string
    )=> {
        return products.filter(
            product =>
                product.categoryCode === category &&
                product.productType === productType
        )
    }

    const handleCategoryChange = (
        index: number,
        category: string
    )=> {
        updateItem(index, {
            category,
            productType: "",
            productId: null
        })
    }

    const handleProductTypeChange = (
        index: number,
        productType: string
    )=> {
        updateItem(index, {
            productType,
            productId: null
        })
    }

    const updateItem = (
        index: number,
        changes: Partial<PurchaseOrderItemForm>
    ) => {
        setItems(prev =>
            prev.map((item, itemIndex) =>
                itemIndex === index
                    ? {...item, ...changes}
                    : item
            )
        )
    }

    const addItem = () => {
        setItems(prev => [...prev, emptyItem()])
    }

    const removeItem = (index: number) => {
        setItems(prev =>
            prev.filter((_, itemIndex) => itemIndex !== index)
        )
    }

    const handleSubmit = async () => {
        setError("")

        if(supplierId === null){
            setError("Vyberte dodavatele.")
            return
        }

        for(const item of items){
            if(
                !item.category ||
                !item.productType ||
                item.productId === null
            ){
                setError("Vyberte produkt u vsech polozek")
                return
            }

            if(item.quantity < 1){
                setError("Mnozstvi musi byt alespon 1")
                return
            }

            if(item.countryId === null){
                setError("Vyberte zemi puvodu u vsech polozek")
                return
            }
        }

        const dto: PurchaseOrderCreateDto = {
            supplierId,
            items: items.map(
                (item): PurchaseOrderItemCreateDto => ({
                    productId: item.productId!,
                    quantity: item.quantity,
                    countryId: item.countryId!
                })
            )
        }

        try {
            setLoading(true)

            await createPurchaseOrder(dto)

            onSaved()
            onClose()

            setSupplierId(null)
            setItems([emptyItem()])
        }catch {
            setError("Nepodarilo se vytvorit nakupni objednavku")
        }finally {
            setLoading(false)
        }
    }

    if(!show){
        return null;
    }

    return (
        <>
            <div className="modal-backdrop-custom">

                <div className="modal-custom">
                    <div className="modal-content-custom">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                Nova nakupni objednavka
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                disabled={loading}
                            />
                        </div>

                        <div className="modal-body">

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">
                                    Dodavatel
                                </label>

                                <select
                                    className="form-select"
                                    value={supplierId ?? ""}
                                    onChange={event =>
                                        setSupplierId(
                                            event.target.value
                                                ? Number(event.target.value)
                                                : null
                                        )
                                    }
                                    disabled={loading}
                                >
                                    <option value="">
                                        Vyberte dodavatele
                                    </option>

                                    {suppliers.map(supplier => (
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
                            </div>

                            <hr/>

                            <h6 className="mb-3">Polozky objednavky</h6>

                            {items.map((item, index) => {
                                const productTypes = getProductTypes(item.category)

                                const availableProducts =
                                    getProductsForItem(
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

                                            {items.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeItem(index)}
                                                    disabled={loading}
                                                >Odebrat</button>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <label className="form-label">
                                                    Category
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={item.category}
                                                    onChange={event => handleCategoryChange(index, event.target.value)}
                                                    disabled={loading}
                                                >
                                                    <option value="">
                                                        Vyberte kategorii
                                                    </option>

                                                    {categories.map(category => (
                                                        <option
                                                            key={category}
                                                            value={category}
                                                        >
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label">
                                                    Product Type
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={item.productType}
                                                    onChange={event => handleProductTypeChange(index, event.target.value)}
                                                    disabled={loading || !item.category}
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
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label">
                                                    Product
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={item.productId ?? ""}
                                                    onChange={event => updateItem(index, {productId: event.target.value ? Number(event.target.value) : null})}
                                                    disabled={loading || !item.productType}
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
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Mnozstvi
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    min={1}
                                                    value={item.quantity}
                                                    onChange={event => updateItem(index, {quantity: Number(event.target.value)})}
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">
                                                    Zeme puvodu
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={item.countryId ?? ""}
                                                    onChange={event => updateItem(index, {countryId: event.target.value ? Number(event.target.value) : null})}
                                                    disabled={loading}
                                                >
                                                    <option value="">Vyberte zemi</option>
                                                    {countries.map(country => (
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
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={addItem}
                                disabled={loading}
                            >
                                Pridat polozku
                            </button>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Zrusit
                            </button>

                            <button
                                type="button"
                                className="btn btn-success m-lg-1"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading
                                    ? "Vytvareni..."
                                    : "Vytvorit"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}