import {useState} from "react";
import type {SectorType} from "../../../types/warehouse.ts";

export default function useSectorTypeModal(){
    const [editingSectorType, setEditingSectorType] = useState<SectorType | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openCreate = () => {
        setEditingSectorType(null)
        setShowEditModal(true)
    }

    const openEdit = async (sectorType: SectorType) => {
        setEditingSectorType(sectorType)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingSectorType(null)
        setShowEditModal(false)
    }

    return{
        editingSectorType, showEditModal,
        openCreate, openEdit, closeEdit
    }
}