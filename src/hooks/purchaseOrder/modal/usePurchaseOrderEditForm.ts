import type {PurchaseOrderDetail} from "../../../types/purchaseOrder.ts";
import {useEffect, useState} from "react";
import useSuppliers from "../supplier/useSuppliers.ts";
import {updatePurchaseOrder} from "../../../api/PurchaseOrderApi.ts";

type Props = {
    show: boolean;
    purchaseOrderId: number;
    purchaseOrder: PurchaseOrderDetail;
    onSaved: () => void;
}

export default function usePurchaseOrderEditForm({
    show, onSaved, purchaseOrder, purchaseOrderId
}:Props){
    const {suppliers, loadingSuppliers, suppliersError} = useSuppliers({active: true, enabled: show})

    const [supplierId, setSupplierId] = useState<number>(purchaseOrder.supplierId)

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!show) return

        setSupplierId(purchaseOrder.supplierId)
        setError("")
    }, [show, purchaseOrder.supplierId]);

    const handleSave = async () => {
        if(supplierId === null){
            setError("Vyberte dodavatele")
            return
        }

        try{
            setSaving(true)
            setError("")

            await updatePurchaseOrder(purchaseOrderId, supplierId)

            onSaved()
        }catch{
            setError("Nakupni objednavku se nepodarilo upravit")
        }finally {
            setSaving(false)
        }
    }

    return{
        suppliers, loadingSuppliers, suppliersError, supplierId, setSupplierId,
        saving, error, handleSave
    }
}