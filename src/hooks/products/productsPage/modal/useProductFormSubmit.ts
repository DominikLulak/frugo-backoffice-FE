import {useState} from "react";
import type {ProductCreateDto} from "../../../../types/product.ts";
import {createProduct, updateProduct} from "../../../../api/ProductApi.ts";

type Props = {
    productId: number;
    isEditing: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useProductFormSubmit({
    productId, onClose, onSaved, isEditing
}:Props){
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState("")

    const handleSubmit = async (data: ProductCreateDto) => {
        setSaveError("")

        try{
            setSaving(true)

            if(isEditing){
                await updateProduct(productId, data)
            }else{
                await createProduct(data)
            }

            await onSaved()
            onClose()
        }catch{
            setSaveError(
                isEditing
                    ? "Produkt se nepodarilo upravit"
                    : "Produkt se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        saveError, saving, handleSubmit
    }
}