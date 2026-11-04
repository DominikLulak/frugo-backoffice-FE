import {useState} from "react";
import type {Packaging} from "../../../types/product.ts";

export default function usePackagingModal(){
    const [editingPackaging, setEditingPackaging] = useState<Packaging | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openCreate = () => {
        setEditingPackaging(null)
        setShowEditModal(true)
    }

    const openEdit = async (packaging: Packaging) => {
        setEditingPackaging(packaging)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingPackaging(null)
        setShowEditModal(false)
    }

    return{
        editingPackaging, showEditModal,
        openCreate, openEdit, closeEdit
    }
}