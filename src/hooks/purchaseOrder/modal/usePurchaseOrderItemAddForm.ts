import type {Product} from "../../../types/product.ts";
import {useEffect, useState} from "react";
import type {PurchaseOrderItemCreateDto} from "../../../types/purchaseOrder.ts";
import {addPurchaseOrderItem} from "../../../api/PurchaseOrderApi.ts";

type Props = {
    show: boolean;
    purchaseOrderId: number;
    products: Product[];
    onClose: () => void;
    onSaved: () => void;
}

export default function usePurchaseOrderItemAddForm({show, purchaseOrderId, products, onClose, onSaved}:Props){
    const [category, setCategory] = useState("")
    const [productType, setProductType] = useState("")
    const [productId, setProductId] = useState<number | null>(null)
    const [countryId, setCountryId] = useState<number | null>(null)
    const [quantity, setQuantity] = useState(1)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(show) return

        setCategory("")
        setProductType("")
        setProductId(null)
        setCountryId(null)
        setQuantity(1)
        setError("")
    }, [show]);

    const categories = [
        ...new Set(products.map(product => product.categoryCode))
    ]

    const productTypes = [
        ...new Set(
            products
                .filter(product => product.categoryCode === category)
                .map(product => product.productType)
        )
    ]

    const filteredProducts = products.filter(
        product =>
            product.categoryCode === category &&
            product.productType === productType
    )

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        setProductType("")
        setProductId(null)
    }

    const handleProductTypeChange = (value: string) => {
        setProductType(value)
        setProductId(null)
    }

    const handleSubmit = async () => {
        setError("")

        if(productId === null){
            setError("Vyberte produkt")
            return
        }

        if(!Number.isInteger(quantity) || quantity < 1){
            setError("Mnozstvi musi byt alespon 1")
            return
        }

        if(countryId === null){
            setError("Vyberte zemi")
            return
        }

        const dto: PurchaseOrderItemCreateDto = {
            productId,
            quantity,
            countryId
        }

        try{
            setLoading(true)

            await addPurchaseOrderItem(purchaseOrderId, dto)

            onSaved()
            onClose()
        }catch{
            setError("Nepodarilo se prodat polozku objednavky")
        }finally {
            setLoading(false)
        }
    }

    return{
        category, productType, productId, countryId, quantity,
        loading, error, categories, productTypes, filteredProducts, setProductId, setCountryId,
        setQuantity, handleCategoryChange, handleProductTypeChange, handleSubmit
    }
}