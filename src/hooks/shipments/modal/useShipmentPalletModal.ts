import {useState} from "react";
import type {PalletWarehouseItem} from "../../../types/pallet.ts";
import {getPalletItems} from "../../../api/ShipmentsApi.ts";

type SelectedPallet = {
    id: number;
    number: string;
}

export default function useShipmentPalletModal(){
    const [selectedPallet, setSelectedPallet] = useState<SelectedPallet | null>(null)

    const [palletItems, setPalletItems] = useState<PalletWarehouseItem[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const openPallet = async (
        palletId: number,
        palletNumber: string
    )=> {
        try {
            setLoading(true)
            setError("")

            const data = await getPalletItems(palletId)

            setPalletItems(data.items)
            setSelectedPallet({
                id: palletId,
                number: palletNumber
            })
        }catch{
            setError("Nepodarilo se nacist polozky palety")
        }finally {
            setLoading(false)
        }
    }

    const closePallet = () => {
        setSelectedPallet(null)
        setPalletItems([])
        setError("")
    }

    return{
        selectedPallet, palletItems, loading, error, openPallet, closePallet
    }
}