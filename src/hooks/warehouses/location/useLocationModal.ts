import {useState} from "react";
import type {Location} from "../../../types/warehouse.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useLocationModal({onSaved}:Props){
    const [editingLocation, setEditingLocation] = useState<Location | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openCreate = () => {
        setEditingLocation(null)
        setShowEditModal(true)
    }

    const openEdit = (location: Location) => {
        setEditingLocation(location)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingLocation(null)
        setShowEditModal(false)
    }

    const handleLocationSave = async () => {
        await onSaved()
    }

    return{
        editingLocation, showEditModal,
        openCreate, openEdit, closeEdit, handleLocationSave
    }
}