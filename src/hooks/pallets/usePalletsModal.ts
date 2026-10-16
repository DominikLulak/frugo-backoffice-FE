import {useState} from "react";
import type {Pallet, PalletDetail} from "../../types/pallet.ts";
import {getPalletDetail} from "../../api/PalletsApi.ts";

export default function usePalletsModal(){
    const [selectedPallet, setSelectedPallet] = useState<PalletDetail | null>(null)

    const openDetail = async (pallet: Pallet) => {
        const data = await getPalletDetail(pallet.id)
        setSelectedPallet(data)
    }

    const closeDetail = () => {
        setSelectedPallet(null)
    }

    return{
        selectedPallet, openDetail, closeDetail
    }
}