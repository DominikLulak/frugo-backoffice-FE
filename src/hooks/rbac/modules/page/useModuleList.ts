import {useCallback, useEffect, useState} from "react";
import type {Module} from "../../../../types/role.ts";
import {getModules} from "../../../../api/ModuleApi.ts";

export default function useModuleList(){
    const [modules, setModules] = useState<Module[]>([])
    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchModules = useCallback(async () => {
        try{
            setLoading(true)
            setLoadError("")

            const data = await getModules()
            setModules(data)
        }catch{
            setLoadError("Nepodarilo se nacist moduly")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchModules()
    }, [fetchModules]);

    return{
        modules,
        loading,
        loadError,
        fetchModules
    }
}