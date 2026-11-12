import {useState} from "react";
import type {Module, ModuleDetail} from "../../../../types/role.ts";
import {getModuleDetail} from "../../../../api/ModuleApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useModuleModal({onSaved}:Props){
    const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null)
    const [editingModule, setEditingModule] = useState<ModuleDetail | null>(null)

    const [showEditModal, setShowEditModal] = useState(false)

    const openDetail = async (module: Module) => {
        const data = await getModuleDetail(module.id)
        setSelectedModule(data)
    }

    const closeDetail = () => {
        setSelectedModule(null)
    }

    const openCreate = () => {
        setEditingModule(null)
        setShowEditModal(true)
    }

    const openEdit = async (module: Module) => {
        const data = await getModuleDetail(module.id)
        setEditingModule(data)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingModule(null)
        setShowEditModal(false)
    }

    const refreshSelectedModule = async () => {
        if(!selectedModule) return

        const data = await getModuleDetail(selectedModule.id)
        setSelectedModule(data)
    }

    const handleModuleSave = async () => {
        await onSaved()

        if(selectedModule){
            await refreshSelectedModule()
        }
    }

    return{
        selectedModule,
        editingModule,
        showEditModal,
        openDetail,
        closeDetail,
        openCreate,
        openEdit,
        closeEdit,
        refreshSelectedModule,
        handleModuleSave
    }
}