import {useState} from "react";
import {splitWarehouseItem} from "../../../api/StockApi.ts";

const useStockItemSplit = () => {
    const [eti, setEti] = useState("")
    const [quantity, setQuantity] = useState<number | null>(null)

    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const updateEti = (value: string) => {
        setEti(value)
        setSubmitError(null)
        setSuccess(false)
    }

    const updateQuantity = (value: number | null) => {
        setQuantity(value)
        setSubmitError(null)
        setSuccess(false)
    }

    const submitSplit = async () => {
        if(submitting) return

        setSubmitError(null)
        setSuccess(false)

        const normalizedEti = eti.trim()

        if(!normalizedEti){
            setSubmitError("Zadejte ETI baleni")
            return
        }

        if(quantity === null || quantity <= 0){
            setSubmitError("Rozdelovane mnozstvi musi byt vetsi nez 0")
            return
        }

        setSubmitting(true)

        try {
            await splitWarehouseItem({
                eti: normalizedEti,
                quantity: quantity
            })

            setSuccess(true)
            setEti("")
            setQuantity(null)
        }catch (err){
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "Pri rozdeleni baleni doslo k chybe"
            )
        }finally {
            setSubmitting(false)
        }
    }

    const resetForm = () => {
        if(submitting) return

        setEti("")
        setQuantity(null)
        setSubmitError(null)
        setSuccess(false)
    }

    return{
        eti,
        quantity,
        submitting,
        submitError,
        success,

        updateEti,
        updateQuantity,
        submitSplit,
        resetForm
    }
}

export default useStockItemSplit;