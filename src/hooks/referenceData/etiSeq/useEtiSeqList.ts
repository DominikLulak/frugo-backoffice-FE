import {useCallback, useEffect, useState} from "react";
import type {EtiSequence} from "../../../types/etiSequence.ts";
import {getEtiSequences} from "../../../api/EtiSequenceApi.ts";

export default function useEtiSeqList(){
    const [etiSequences, setEtiSequences] = useState<EtiSequence[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchEtiSeq = useCallback(async () => {
        try {
            setLoading(true)
            setError("")

            const data = await getEtiSequences()
            setEtiSequences(data)
        }catch{
            setError("Nepodarilo se nacist eti sequnce")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchEtiSeq()
    }, [fetchEtiSeq]);

    return{
        etiSequences, loading, error
    }
}