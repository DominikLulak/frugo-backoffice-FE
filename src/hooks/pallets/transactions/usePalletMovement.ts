import {useState} from "react";
import {movePallet} from "../../../api/PalletsApi.ts";

const usePalletMovement = () => {
    const [palletEti, setPalletEti] = useState("")
    const [targetLocationCode, setTargetLocationCode] = useState("")

    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const updatePalletEti = (value: string) => {
        setPalletEti(value)
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

        const normalizedPalletEti = palletEti.trim()
        const normalizedTargetLocationCode = targetLocationCode.trim()

        if(!normalizedPalletEti){
            setSubmitError("Zadejte ETI palety")
            return
        }

        if(!normalizedTargetLocationCode){
            setSubmitError("Zadejte cilovou lokaci")
            return
        }

        setSubmitting(true)

        try {
            await movePallet({
                palletEti: normalizedPalletEti,
                targetLocationCode: normalizedTargetLocationCode
            })

            setSuccess(true)
            setPalletEti("")
            setTargetLocationCode("")
        }catch (err){
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "Pri presunu palety nastala chyba"
            )
        }finally {
            setSubmitting(false)
        }
    }

    const resetForm = () => {
        if(submitting) return

        setPalletEti("")
        setTargetLocationCode("")
        setSubmitError(null)
        setSuccess(false)
    }

    return{
        palletEti,
        targetLocationCode,
        submitting,
        submitError,
        success,

        updatePalletEti,
        updateTargetLocationCode,
        submitMovement,
        resetForm
    }
}

export default usePalletMovement;