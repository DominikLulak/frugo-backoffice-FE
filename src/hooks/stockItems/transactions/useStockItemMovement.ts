import {useState} from "react";
import {moveWarehouseItem} from "../../../api/StockApi.ts";

const useStockItemMovement = () => {
    const [eti, setEti] = useState("")
    const [targetLocationCode, setTargetLocationCode] = useState("")

    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const updateEti = (value: string) => {
        setEti(value)
        setSubmitError(null)
        setSuccess(false)
    }

    const updateTargetLocationCode = (value: string) => {
        setTargetLocationCode(value)
        setSubmitError(null)
        setSuccess(false)
    }

    const submitMovement = async () => {
        if(submitting) return

        setSubmitError(null)
        setSuccess(false)

        const normalizedEti = eti.trim()
        const normalizedTargetLocationCode = targetLocationCode.trim()

        if(!normalizedEti){
            setSubmitError("Zadejte ETI baleni")
            return
        }

        if(!normalizedTargetLocationCode){
            setSubmitError("Zadejte cilovou lokaci")
            return
        }

        setSubmitting(true)

        try{
            await moveWarehouseItem({
                eti: normalizedEti,
                targetLocationCode: normalizedTargetLocationCode
            })

            setSuccess(true)
            setEti("")
            setTargetLocationCode("")
        }catch (err){
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "Pri presunu baleni nastala chyba"
            );
        }finally {
            setSubmitting(false)
        }
    }

    const resetForm = () => {
        if(submitting) return

        setEti("")
        setTargetLocationCode("")
        setSubmitError(null)
        setSuccess(false)
    }

    return{
        eti,
        targetLocationCode,
        submitting,
        submitError,
        success,

        updateEti,
        updateTargetLocationCode,
        submitMovement,
        resetForm
    }
}

export default useStockItemMovement;