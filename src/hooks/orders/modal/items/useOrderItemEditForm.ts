import type {OrderProductRow} from "../useOrderModalTableColumns.tsx";
import {useEffect, useState} from "react";
import type {OrderItemUpdateDto} from "../../../../types/order.ts";
import {updateOrderItem} from "../../../../api/OrdersApi.ts";

type Props = {
    show: boolean;
    orderId: number;
    product: OrderProductRow | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

export default function useOrderItemEditForm({
    show, onClose, onSaved, product, orderId
}:Props){
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!show || !product) return

        setQuantity(product.quantity)
        setError("")
    }, [show, product]);

    const handleSubmit = async () => {
        setError("")

        if(!product){
            setError("Neni vybran zadny produkt")
            return
        }

        if(!Number.isInteger(quantity) || quantity < 1){
            setError("Mnozstvi musi byt alespon 1kg")
            return
        }

        const dto: OrderItemUpdateDto = {
            quantity
        }

        try{
            setLoading(true)

            await updateOrderItem(
                orderId, product.productId, dto
            )

            await onSaved()
            onClose()
        }catch{
            setError("Nepodarilo se upravit mnozstvi produktu")
        }finally {
            setLoading(false)
        }
    }

    return{
        quantity, setQuantity, loading, error, handleSubmit
    }
}