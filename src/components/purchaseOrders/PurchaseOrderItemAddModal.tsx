import {useEffect, useState} from "react";
import type {Country} from "../../types/referenceData.ts";
import type {Product} from "../../types/product.ts";
import {getCountries} from "../../api/CountryApi.ts";
import {getProducts} from "../../api/ProductApi.ts";
import type {PurchaseOrderItemCreateDto} from "../../types/purchaseOrder.ts";
import {addPurchaseOrderItem} from "../../api/PurchaseOrderApi.ts";

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
    const [countries, setCountries] = useState<Country[]>([])
    const [products, setProducts] = useState<Product[]>([])

    const [category, setCategory] = useState("")
    const [productType, setProductType] = useState("")
    const [productId, setProductId] = useState<number | null>(null)
    const [countryId, setCountryId] = useState<number | null>(null)
    const [quantity, setQuantity] = useState(1)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!show){
            return
        }

        const loadData = async () => {
            try {
                const [countryData, productData] = await Promise.all([
                    getCountries(),
                    getProducts()
                ])

                setCountries(countryData)
                setProducts(productData)
            } catch {
                setError("Nepodarilo se nacist data")
            }
        }

        loadData()
    }, [show]);

    const categories = [
        ...new Set(
            products.map(product => product.categoryCode)
        )
    ]

    const productTypes = [
        ...new Set(
            products
                .filter(product =>
                    product.categoryCode === category
                )
                .map(product => product.productType)
        )
    ]

    const filteredProducts = products.filter(product =>
        product.categoryCode === category &&
        product.productType === productType
    )

    const handleCategoryChange = (
        value: string
    )=> {
        setCategory(value)
        setProductType("")
        setProductId(null)
    }

    const handleProductTypeChange = (
        value: string
    ) => {
        setProductType(value)
        setProductId(null)
    }

    const handleSubmit = async () => {
        setError("")

        if(!productId){
            setError("Vyberte produkt!")
            return
        }
        if(quantity < 1){
            setError("Mnozstvi musi byt alespon 1")
            return
        }
        if(!countryId){
            setError("Vyberte zemi!")
            return
        }

        const dto: PurchaseOrderItemCreateDto = {
            productId,
            quantity,
            countryId
        }

        try{
            setLoading(true)

            await addPurchaseOrderItem(
                purchaseOrderId,
                dto
            )

            onSaved()
            onClose()
        }catch {
            setError("Nepodarilo se pridat polozku objednavky")
        } finally {
            setLoading(false)
        }
    }

    if(!show){
        return null
    }

    return(
        <div
            className="modal-backdrop-custom modal-backdrop-custom-second"
            onClick={onClose}
        >
            <div
                className="modal-custom modal-custom-second"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Pridat polozku objednavky
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={loading}
                        />
                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <label className="form-label">
                                Kategorie
                            </label>
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">
                                    Vyberte kategorii
                                </option>

                                {categories.map(item => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Druh
                            </label>
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => handleProductTypeChange(e.target.value)}
                                disabled={!category || loading}
                            >
                                <option value="">
                                    Vyberte druh
                                </option>

                                {productTypes.map(item => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Produkt
                            </label>
                            <select
                                className="form-control"
                                value={productId ?? ""}
                                onChange={(e) => setProductId(e.target.value ? Number(e.target.value) : null)}
                                disabled={!productType || loading}
                            >
                                <option value="">
                                    Vyberte produkt
                                </option>

                                {filteredProducts.map(product => (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.productName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Zeme puvodu
                            </label>
                            <select
                                className="form-control"
                                value={countryId ?? ""}
                                onChange={(e) => setCountryId(e.target.value ? Number(e.target.value) : null)}
                                disabled={!productType || loading}
                            >
                                <option value="">
                                    Vyberte zemi puvodu
                                </option>

                                {countries.map(country => (
                                    <option
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Mnozstvi
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}
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
                            {loading ? "Pridavam..." : "Pridat"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}