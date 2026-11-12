import type {PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";
import {useState} from "react";
import {changePurchaseOrderStatus} from "../../../api/PurchaseOrderApi.ts";

type Props ={
    purchaseOrderId: number;
    purchaseOrder: PurchaseOrderDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

const allowedTransitions: Record<string, {code: string; label: string}[]> = {
    ENTERED: [
        { code: "BLOCKED", label: "Blokováno" },
        { code: "CANCELLED", label: "Zrušeno" }
    ],
    RELEASED: [
        { code: "BLOCKED", label: "Blokováno" }
    ],
    BLOCKED: [
        { code: "ENTERED", label: "Zadáno" },
        { code: "RELEASED", label: "Uvolněno" },
        { code: "CANCELLED", label: "Zrušeno" }
    ]
}

export default function usePurchaseOrderStatusForm({purchaseOrderId, purchaseOrder, onSaved, onClose}:Props){
    const [statusCode, setStatusCode] = useState("")
    const [note, setNote] = useState("")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const transitions =
        allowedTransitions[purchaseOrder.statusCode] ?? [];

    const handleSave = async () => {
        if(!statusCode || !note.trim()){
            setError("Vyberte novy stav a vyplnte poznamku.")
            return
        }

        try{
            setSaving(true)
            setError("")

            await changePurchaseOrderStatus(purchaseOrderId, {
                statusCode,
                note: note.trim()
            })

            await onSaved()
            onClose()
        }catch{
            setError("Stav objednavky se nepodarilo zmenit")
        }finally {
            setSaving(false)
        }
    }

    return{
        statusCode, setStatusCode, note, setNote,
        saving, error, transitions, handleSave
    }
}