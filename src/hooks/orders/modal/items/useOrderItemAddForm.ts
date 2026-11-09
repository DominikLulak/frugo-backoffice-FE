import type {Product} from "../../../../types/product.ts";
import {useEffect, useState} from "react";
import type {OrderItemCreateDto} from "../../../../types/order.ts";
import {addOrderItem} from "../../../../api/OrdersApi.ts";

type Props = {
    show: boolean;
    orderId: number;
    products: Product[]
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useOrderItemAddForm({
    show, onClose, products, orderId, onSaved
}:Props){
    const [category, setCategory] = useState("")
    const [productType, setProductType] = useState("")
    const [productId, setProductId] = useState<number | null>(null)
    const [quantity, setQuantity] = useState(1)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(show) return

        setCategory("")
        setProductType("")
        setProductId(null)
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

        if (!Number.isInteger(quantity) || quantity < 1){
            setError("Mnozstvi musi byt alespon 1 kg")
            return
        }

        const dto: OrderItemCreateDto = {
            productId, quantity
        }

        try {
            setLoading(true)

            await addOrderItem(orderId, dto)
            await onSaved()
            onClose()
        }catch{
            setError("Nepodarilo se pridat produkt do objednavky")
        }finally {
            setLoading(false)
        }
    }

    return{
        category, productType, productId, quantity,
        loading, error,
        categories, productTypes, filteredProducts,
        setProductId, setQuantity,
        handleCategoryChange, handleProductTypeChange, handleSubmit
    }
}