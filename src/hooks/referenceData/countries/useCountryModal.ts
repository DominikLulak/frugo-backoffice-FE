import {useState} from "react";
import type {Country} from "../../../types/referenceData.ts";

export default function useCountryModal(){
    const [editingCountry, setEditingCountry] = useState<Country | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openCreate = () => {
        setEditingCountry(null)
        setShowEditModal(true)
    }

    const openEdit = async (country: Country) => {
        setEditingCountry(country)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingCountry(null)
        setShowEditModal(false)
    }

    return{
        editingCountry, showEditModal,
        openCreate, openEdit, closeEdit
    }
}