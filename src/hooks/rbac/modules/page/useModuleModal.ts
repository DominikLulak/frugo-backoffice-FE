import {useState} from "react";
import type {Module, ModuleDetail} from "../../../../types/role.ts";
import {getModuleDetail} from "../../../../api/ModuleApi.ts";

export default function useModuleModal(){
    const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null)

    const openDetail = async (module: Module) => {
        const data = await getModuleDetail(module.id)
        setSelectedModule(data)
    }

    const closeDetail = () => {
        setSelectedModule(null)
    }

    return{
        selectedModule,
        openDetail,
        closeDetail
    }
}