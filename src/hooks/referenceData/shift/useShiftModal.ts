import {useState} from "react";
import type {Shift} from "../../../types/referenceData.ts";


export default function useShiftModal(){
    const [editingShift, setEditingShift] = useState<Shift | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openCreate = () => {
        setEditingShift(null)
        setShowEditModal(true)
    }

    const openEdit = async (shift: Shift) => {
        setEditingShift(shift)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingShift(null)
        setShowEditModal(false)
    }

    return{
        editingShift, showEditModal,
        openCreate, openEdit, closeEdit
    }
}